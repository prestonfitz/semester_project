import {apiMealToRecipe, type ApiStatus, type Recipe} from './types.ts'
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {fetchJsonUnknown} from './api.ts'
import {isApiResponse, isRecipe} from './typeGuard.ts'

export function RecipeViewer() {
    const {source, id} = useParams()
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    const [apiState, changeApiState] = useState<ApiStatus>({status: 'idle'})

    useEffect(() => {
        let cancelled = false;
            (async () => {
                if (source === 'database') {
                    changeApiState(() => {
                        return {status: 'loading'}
                    })
                    const response = await fetchJsonUnknown(baseUrl + id)
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
                            return {status: 'error', error: {type: 'parse', message: 'Search returned no data or malformed data'}}
                        })
                        return
                    }
                } else if (source === 'local') {
                    if (id === undefined) {
                        changeApiState(() => {
                            return {status: 'error', error: {type: 'http', status: 404, statusText: 'No ID given to search'}}
                        })
                        return
                    }
                    const rawItem = localStorage.getItem(id)

                    if (rawItem === null) {
                        changeApiState(() => {
                            return {
                                status: 'error',
                                error: {type: 'network', message: 'Unable to find recipe with given id'}
                            }
                        })
                        return
                    }

                    try {
                        const jsonItem: unknown = JSON.parse(rawItem)

                        if (isRecipe(jsonItem)) {
                            changeApiState(() => {
                                return {status: 'success', data: [jsonItem]}
                            })
                            return
                        }
                        changeApiState(() => {
                            return {status: 'error', error: {type: 'parse', message: 'Item is not a recipe'}}
                        })
                        return
                    } catch {
                        changeApiState(() => {
                            return {status: 'error', error: {type: 'parse', message: 'Item is not valid JSON'}}
                        })
                        return
                    }
                } else {
                    changeApiState(() => {
                        return {status: 'error', error: {type: 'network', message: 'Cannot search at that source'}}
                    })
                }
            })();

        return () => {
            cancelled = true
        }
    },[id, source])

    switch (apiState.status){
        case 'error':
            return (
                <>
                    <p>{apiState.error.type}: {apiState.error.type === 'http' ? apiState.error.status : apiState.error.message}</p>
                </>
            )
        case 'loading':
            return (
                <p>Searching recipes, please hold <span className="loader"></span></p>
            )
        case 'success':
            if (apiState.data === null || apiState.data.length === 0) {
                return (
                    <p>Unable to find recipe</p>
                )
            }

            return (
                <div id={"recipe"}>
                    <Link to={source === 'local' ? '/local' : '/'} className={'link'}>Home</Link>
                    {source === 'local' ? <Link className={'link'} to={`/local/edit/${apiState.data[0].id}`}>Edit</Link> : ''}
                    <h2>{apiState.data[0].title}</h2>
                    <p style={{marginBottom: 0}}>{apiState.data[0].genre}</p>
                    <p>{apiState.data[0].category}</p>

                    {apiState.data[0].ingredients.length > 0 ?
                        <div id={'ingredients'}>
                            <h4>Ingredients</h4>
                            <table className={'table'}>
                                <tbody>
                                {apiState.data[0].ingredients.map((i, index) => (
                                    <tr key={`ingredient${index}`}>
                                        <td>{i.name}</td>
                                        <td>{i.measurement}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        : ''}

                    {apiState.data[0].instructions.length > 0 ?
                        <div id={'instructions'}>
                            <h4>Instructions</h4>
                            <ul className={'list-unstyled'}>
                                {apiState.data[0].instructions.map((i, index) => <li style={{marginBottom: 8}} key={`instruction${index}`}>{i}</li>)}
                            </ul>
                        </div>
                        : ''}

                </div>
            )
        case 'idle':
            return (
                <p>You appear to have arrived here by mistake; please go back and select a recipe to view</p>
            )
        default:
            return (
                <p>Something is horribly wrong. Please stop looking at me.</p>
            )
    }
}

export default RecipeViewer

