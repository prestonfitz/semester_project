import {useEffect, useState} from 'react'
import {apiMealToRecipe, type ApiStatus, type Recipe} from './types.ts'
import {fetchJsonUnknown} from './api.ts'
import {isApiResponse, isRecipe} from './typeGuard.ts'
import {Link} from 'react-router-dom'

function Search({isLocal} : {isLocal: boolean}) {
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
            if (!isLocal) {
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
                        return {
                            status: 'error',
                            error: {type: 'parse', message: 'Search returned no data or malformed data'}
                        }
                    })
                    return
                }
            } else {
                const recipes: Recipe[] = []
                const keys = Object.keys(localStorage)

                for (const key of keys) {
                    if (cancelled) {
                        return
                    }

                    const rawItem = localStorage.getItem(key)

                    if (rawItem === null) {
                        continue
                    }

                    try {
                        const jsonItem: unknown = JSON.parse(rawItem)

                        if (isRecipe(jsonItem)) {
                            recipes.push(jsonItem)
                        }
                    } catch {
                        // If this errors, we assume that the object was for something else and move on
                    }
                }

                changeApiState(() => {
                    return {status: 'success', data: recipes}
                })
            }
        })();

        return () => {
            cancelled = true
        }
    },[url, isLocal])

    const searchForm = () => {
        return (
            <>
                <h2>Find New Recipes</h2>
                <Link to={'/local'}>Personal Recipes</Link>
                <form>
                    <label htmlFor={"recipeSearch"}>Search Recipes by Key Word</label>
                    <input id={"recipeSearch"} value={searchDisplay} onChange={(e) => changeSearchDisplay(() => e.target.value)} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        searchUrl()
                    }}>
                        Search
                    </button>
                    {apiState.status === 'success' ? <RecipeList recipes={apiState.data} source={'database'} /> : ''}
                    {apiState.status === 'loading' ?
                        <p>Searching recipes, please hold <span className="loader"></span></p> : ''}
                    {apiState.status === 'error' ? <p>{apiState.error.type}: {apiState.error.type === 'http' ? apiState.error.status : apiState.error.message}</p> : ''}
                </form>
            </>

        )
    }

    const personalRecipes = () => {
        return(
            <>
                <h2>Personal Recipes</h2>
                <Link to={'/'}>Search Recipes</Link>
                <Link to={'/local/create'}>Create new recipe</Link>
                {apiState.status === 'success' ? <RecipeList recipes={apiState.data} source={'local'} /> : ''}
                {apiState.status === 'loading' ?
                    <p>Retrieving recipes, please hold <span className="loader"></span></p> : ''}
                {apiState.status === 'error' ? <p>{apiState.error.type}: {apiState.error.type === 'http' ? apiState.error.status : apiState.error.message}</p> : ''}
            </>
        )
    }

    return (
        <>
            {isLocal ? personalRecipes() : searchForm()}
        </>
    )
}

function RecipeList({recipes, source}: { recipes: Recipe[], source: string }) {
    if (recipes.length > 0) {
        return (
            <div>
                {recipes.map((r) =>
                    <Link to={`/recipe/${source}/${r.id}`}>
                        <div key={r.id}>
                            <h3 style={{marginBottom: 0}}>{r.title}</h3>
                            <div style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', alignContent: 'center'}}>
                                <div style={{textAlign: 'left', width: '6em'}}>Genre:</div>
                                <div style={{textAlign: 'left', width: '12em'}}>{r.genre}</div>
                                <div style={{textAlign: 'left', width: '6em'}}>Category:</div>
                                <div style={{textAlign: 'left', width: '6em'}}>{r.category}</div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <p>Sorry, we were unable to find any recipes matching that search term</p>
    )
}

export default Search