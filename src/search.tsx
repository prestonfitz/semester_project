import {useEffect, useState} from 'react'
import {apiMealToRecipe, type ApiStatus, type Recipe} from './types.ts'
import {fetchJsonUnknown} from './api.ts'
import {isApiResponse} from './typeGuard.ts'

function Search() {
    const featuredSearches = ['fried', 'baked', 'bread', 'cheese', 'noodle','salad', 'chicken', 'pork', 'beef', 'fish']
    // This is a deliberate decision; I want random, unpredictable functionality for this particular render (I think)
    // eslint-disable-next-line react-hooks/purity
    const startingSearchIndex = Math.floor(Math.random() * 10)
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    const [url, changeUrl] = useState<string>(baseUrl + featuredSearches[startingSearchIndex])
    const [searchDisplay, changeSearchDisplay] = useState<string>("")
    const [apiState, changeApiState] = useState<ApiStatus>({status: 'idle'})
    const searchUrl = () => {
        changeUrl(() => baseUrl + searchDisplay)
    }

    useEffect(() => {
        let cancelled = false;
        (async () => {
            changeApiState(() => {
                return {status: 'loading'}
            })
            const response = await fetchJsonUnknown(url)
            if (cancelled) {
                return
            }
            if (!response.ok) {
                changeApiState(() => {
                    return {status: 'error', error: response.error}
                })
                return
            }
            console.log(response)
            if (isApiResponse(response.data)) {
                const recipes: Recipe[] = []
                if (response.data.meals !== null) {
                    for (const meal of response.data.meals) {
                        recipes.push(apiMealToRecipe(meal))
                    }
                }
                changeApiState(() => {
                    return {status: 'success', data: recipes}
                })
                return
            } else {
                changeApiState(() => {
                    console.log(response)
                    return {status: 'error', error: {type: 'parse', message: 'Search returned no data or malformed data'}}
                })
                return
            }
        })();

        return () => {
            cancelled = true
        }
    },[url])

    return (
        <>
            <h2>Find New Recipes</h2>
            <form>
                <label htmlFor={"recipeSearch"}>Search Recipes by Key Word</label>
                <input id={"recipeSearch"} value={searchDisplay} onChange={(e) => changeSearchDisplay(() => e.target.value)} />
                <button onClick={(e) => {
                    e.preventDefault();
                    searchUrl()
                }}>Search</button>
                {url}
                {apiState.status === 'success' ? <RecipeList recipes={apiState.data} /> : ''}
                {apiState.status === 'loading' ?
                    <p>Searching recipes, please hold <span className="loader"></span></p> : ''}
                {apiState.status === 'error' ? <p>{apiState.error.type}: {apiState.error.type === 'http' ? apiState.error.status : apiState.error.message}</p> : ''}
            </form>
        </>
    )
}

function RecipeList({recipes}: { recipes: Recipe[] }) {
    if (recipes.length > 0) {
        return (
            <div>
                {recipes.map((r) =>
                    <div key={r.id}>
                        <p>{r.title}</p>
                        <p>{r.genre}</p>
                        <p>{r.category}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <p>Sorry, we were unable to find any recipes matching that search term</p>
    )
}

export default Search