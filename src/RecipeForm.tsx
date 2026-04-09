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
    | { type: 'changeIngredient', value: Ingredient, index: number }
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
        case 'changeInstruction':
            prevState.recipe.instructions[action.index] = action.value
            return { ...prevState, recipe: {...prevState.recipe, instructions: prevState.recipe.instructions}}
        case 'submit':
            if (!prevState.recipe.title.trim()) {
                alert(JSON.stringify(prevState))
                return {...prevState, status: 'error', error: 'Hey buddy, you want to put in a title?'}
            }
            localStorage.setItem('1', JSON.stringify(prevState.recipe))
            return {...prevState, status: 'submitted'}
        default: throw new Error(`That is not a valid form state`)
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
    const ingredientsInput = (ingredient: Ingredient) => {
        return (
            <li>
                <label htmlFor={'ingredient'}>Ingredient</label>
                <input name={'ingredient'} id={'ingredient'} value={ingredient.name} />
                <label htmlFor={'measurement'}>Measurement</label>
                <input name={'measurement'} id={'measurement'} value={ingredient.measurement} />
            </li>
        )
    }

    function instructionsInput() {
        return (
            <li>
                <label htmlFor={'instruction'}>Instruction</label>
                <input name={'instruction'} id={'instruction'} />
            </li>
        )
    }

    const changeVal = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, action: Action['type']) => {
        dispatch({type: action, value: e.target.value})
    }

    return (
        <>
            <h2>
                {id !== null ? 'Edit' : 'Create New'} Recipe
            </h2>
            <form>
                <label htmlFor={'title'} >Title</label>
                <input name={'title'} id={'title'} value={state.recipe.title} onChange={(e) => changeVal(e, 'changeTitle')} />
                <label htmlFor={'genre'}>Genre</label>
                <input name={'genre'} id={'genre'} value={state.recipe.genre} onChange={(e) => changeVal(e, 'changeGenre')} />
                <label htmlFor={'category'}>Category</label>
                <input name={'category'} id={'category'} value={state.recipe.category} onChange={(e) => changeVal(e, 'changeCategory')} />
                {state.recipe.ingredients.length > 0 ?
                    <ul>
                        {/*consider switching to a function*/}
                        {ingredientsInput(state.recipe.ingredients[0])}
                    </ul>
                    : ''}
                <ol>
                    {instructionsInput()}
                </ol>
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