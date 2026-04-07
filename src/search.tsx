import {useEffect, useState} from 'react'
import {apiMealToRecipe, testRecipe, type ApiStatus, type Recipe} from './types.ts'
import {fetchJsonUnknown} from './api.ts'
import {isApiResponse} from './typeGuard.ts'

function Search() {
    const baseUrl = 'Hi there'
    const [url, changeUrl] = useState<string>(baseUrl)
    const [searchDisplay, changeSearchDisplay] = useState<string>("")
    const [apiState, changeApiState] = useState<ApiStatus>({status: 'success', data: [testRecipe]})
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
            </form>
        </>
    )
}

function RecipeList({recipes}: { recipes: Recipe[] }) {
    return (
        <div>
            {recipes.map((r) =>
                <div>
                    <p>{r.title}</p>
                    <p>{r.genre}</p>
                    <p>{r.category}</p>
                </div>
            )}
        </div>
    )
}

export default Search