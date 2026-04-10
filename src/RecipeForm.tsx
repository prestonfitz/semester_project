import type {Ingredient, Recipe} from './types.ts'
import {useReducer} from 'react'
import {isRecipe} from './typeGuard.ts'
import {useParams} from 'react-router-dom'

type Action =
    | { type: 'changeTitle', value: string }
    | { type: 'changeGenre', value: string }
    | { type: 'changeCategory', value: string }
    | { type: 'changeInstruction', value: string, index: number }
    | { type: 'addInstruction' }
    | { type: 'removeInstruction', index: number }
    | { type: 'reorderInstruction', index: number, direction: 'up' | 'down'}
    | { type: 'changeIngredient', value: string, index: number }
    | { type: 'changeMeasurement', value: string, index: number }
    | { type: 'addIngredient' }
    | { type: 'removeIngredient', index: number }
    | { type: 'reorderIngredient', index: number, direction: 'up' | 'down'}
    | { type: 'submit'}

type FormState =
    | { status: 'editing', recipe: Recipe }
    | { status: 'error', recipe: Recipe, error: string }
    | { status: 'submitted', recipe: Recipe }

function reducer(prevState: FormState, action: Action): FormState {
    switch (action.type) {
        case 'changeTitle': return { ...prevState, recipe: {...prevState.recipe, title: action.value}}
        case 'changeCategory': return { ...prevState, recipe: {...prevState.recipe, category: action.value}}
        case 'changeGenre': return { ...prevState, recipe: {...prevState.recipe, genre: action.value}}
        case 'changeInstruction': {
            const newInstruction: string[] = prevState.recipe.instructions.map((inst, ind) => {
                if (ind === action.index) {
                    return action.value
                } else {
                    return inst
                }
            })
            return {...prevState, recipe: {...prevState.recipe, instructions: newInstruction}}
        }
        case 'changeMeasurement': {
            const newMeasure: Ingredient[] = prevState.recipe.ingredients.map((m, i) => {
                if (i === action.index) {
                    return {...m, measurement: action.value}
                } else {
                    return m
                }
            })
            return { ...prevState, recipe: {...prevState.recipe, ingredients: newMeasure}}
        }
        case 'changeIngredient': {
            const newIngredient: Ingredient[] = prevState.recipe.ingredients.map((ing, ind) => {
                if (ind === action.index) {
                    return {...ing, name: action.value}
                } else {
                    return ing
                }
            })
            return {...prevState, recipe: {...prevState.recipe, ingredients: newIngredient}}
        }
        case 'addInstruction':
            return {...prevState, recipe: {...prevState.recipe, instructions: [...prevState.recipe.instructions, '']}}
        case 'addIngredient':
            return {...prevState, recipe: {...prevState.recipe, ingredients: [...prevState.recipe.ingredients, {name: '', measurement: ''}]}}
        case 'removeIngredient':
            return {...prevState, recipe: {...prevState.recipe, ingredients: prevState.recipe.ingredients.filter((_, i) => i !== action.index)}}
        case 'removeInstruction':
            return {...prevState, recipe: {...prevState.recipe, instructions: prevState.recipe.instructions.filter((_, i) => i !== action.index)}}
        case 'reorderIngredient': {
            if ((action.direction === 'up' && 0 > action.index - 1) || (action.direction === 'down' && prevState.recipe.ingredients.length <= action.index + 1)){
                return prevState
            }
            const reorderedArray = [...prevState.recipe.ingredients]
            const newIndex = action.direction === 'up' ? action.index - 1 : action.index + 1
            const temp = reorderedArray[newIndex]
            reorderedArray[newIndex] = reorderedArray[action.index]
            reorderedArray[action.index] = temp
            return {...prevState, recipe: {...prevState.recipe, ingredients: reorderedArray}}
        }
        case 'reorderInstruction': {
            if ((action.direction === 'up' && 0 > action.index - 1) || (action.direction === 'down' && prevState.recipe.instructions.length <= action.index + 1)){
                return prevState
            }
            const reorderedArray = [...prevState.recipe.instructions]
            const newIndex = action.direction === 'up' ? action.index - 1 : action.index + 1
            const temp = reorderedArray[newIndex]
            reorderedArray[newIndex] = reorderedArray[action.index]
            reorderedArray[action.index] = temp
            return {...prevState, recipe: {...prevState.recipe, instructions: reorderedArray}}
        }
        case 'submit':
            if (!prevState.recipe.title.trim()) {
                return {...prevState, status: 'error', error: 'Hey buddy, you want to put in a title?'}
            }
            localStorage.setItem('1', JSON.stringify(prevState.recipe))
            return {...prevState, status: 'submitted'}
        default:
            {
                const _exhaustiveCheck: never = action;
                throw new Error(`That is not a valid form state`);
                // I don't want to edit the linter config, so this shuts it up
                console.log(_exhaustiveCheck)
            }
    }
}

function RecipeForm() {
    const {id} = useParams()
    const setInitialState = (): FormState => {
        const initialState: Recipe = {
            id: '',
            title: '',
            category: '',
            genre: '',
            ingredients: [],
            instructions: []
        }
        if (id === undefined) {
            return {status: 'editing', recipe: initialState}
        }

        const rawItem = localStorage.getItem(id)

        if (rawItem === null) {
            return {status: 'error', recipe: initialState, error: `Unable for find recipe with ID ${id}`}
        }

        try {
            const jsonItem: unknown = JSON.parse(rawItem)

            if (isRecipe(jsonItem)) {
                return {status: 'editing', recipe: jsonItem}
            }

            return {status: 'error', recipe: initialState, error: `Found something for recipe ID ${id}, but it wasn't a recipe`}
        } catch {
            return {status: 'error', recipe: initialState, error: `Found invalid JSON for recipe ID ${id}`}
        }
    }


    const [state, dispatch] = useReducer(reducer, setInitialState())
    const ingredientsInput = (ingredient: Ingredient, index: number) => {
        return (
            <li key={`ingredient${index}`}>
                <label htmlFor={`ingredient${index}`}>Ingredient</label>
                <input name={`ingredient${index}`} id={`ingredient${index}`} value={ingredient.name} onChange={(e) => dispatch({type: 'changeIngredient', value: e.target.value, index: index})} />
                <label htmlFor={`measurement${index}`}>Measurement</label>
                <input name={`measurement${index}`} id={`measurement${index}`} value={ingredient.measurement} onChange={(e) => dispatch({type: 'changeMeasurement', value: e.target.value, index: index})} />
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'reorderIngredient', index: index, direction: 'up'})
                }}>Up</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'reorderIngredient', index: index, direction: 'down'})
                }}>Down</button>
            </li>
        )
    }

    function instructionsInput(instruction: string, index: number) {
        return (
            <li key={`instruction${index}`}>
                <label htmlFor={`instruction${index}`}>Instruction</label>
                <input name={`instruction${index}`} id={`instruction${index}`} value={instruction} onChange={(e) => dispatch({type: 'changeInstruction', value: e.target.value, index: index})} />
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'reorderInstruction', index: index, direction: 'up'})
                }}>Up</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({type: 'reorderInstruction', index: index, direction: 'down'})
                }}>Down</button>
            </li>
        )
    }

    return (
        <>
            <h2>
                {id !== null ? 'Edit' : 'Create New'} Recipe
            </h2>
            <form>
                <label htmlFor={'title'} >Title</label>
                <input name={'title'} id={'title'} value={state.recipe.title} onChange={(e) => dispatch({type: 'changeTitle', value: e.target.value})} />
                <label htmlFor={'genre'}>Genre</label>
                <input name={'genre'} id={'genre'} value={state.recipe.genre} onChange={(e) => dispatch({type: 'changeGenre', value: e.target.value})} />
                <label htmlFor={'category'}>Category</label>
                <input name={'category'} id={'category'} value={state.recipe.category} onChange={(e) => dispatch({type: 'changeCategory', value: e.target.value})} />
                {state.recipe.ingredients.length > 0 ?
                    <ul>
                        {/*consider switching to a function*/}
                        {state.recipe.ingredients.map((i, index) => {
                                return ingredientsInput(i, index)
                            })
                        }
                    </ul>
                    : ''}
                <button onClick={ (e) => {
                    e.preventDefault();
                    dispatch({type: 'addIngredient'})
                }}>Add ingredient</button>
                <ol>
                    {state.recipe.instructions.map((i, index) => {
                        return instructionsInput(i, index)
                    })}
                </ol>
                <button onClick={ (e) => {
                    e.preventDefault();
                    dispatch({type: 'addInstruction'})
                }}>Add instruction</button>
            </form>
            <a href={'/local'}>Cancel</a>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch({type: 'submit'})
            }}>Submit</button>
            <p>{state.status}</p>
            <p style={{color: 'red'}}>{state.status === 'error' ? state.error : ''}</p>
        </>
    )
}

export default RecipeForm