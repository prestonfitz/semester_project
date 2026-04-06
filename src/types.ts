// This is a fairly small app (only 3-5 pages). There are parts of each of the object that can show up on
// the home page as well as one or more children. As such, most of this will have to live at the top level.
// Fortunately, this is a fairly small app, so we won't do tons of drilling.

// These are used for tracking the status of the API call and any relevant errors.
export type Result<T> =
    | { ok: true; data: T }
    | { ok: false; error: FetchError }

export type FetchError =
    | {type: 'network', message: string}
    | {type: 'http', status: number, statusText: string}
    | {type: 'parse', message: string}

// This is the recipe as I will display it.
export type Recipe = {
    id: string
    title: string
    category: string
    genre: string
    instructions: string[]
    ingredients: Ingredient[]
}

export type Ingredient = {
    name: string
    measurement: string
}

// This is the data I will get back from the API matched to what it will map to from the above type
type ApiResponse = {
    meals: ApiMeal[]
}

type ApiMeal = {
    idMeal: string // id
    strMeal: string // title
    strCategory: string // category
    strArea: string // genre
    strInstructions: string // instructions; split on \r\n
    strMealThumb: string // picture. Maybe use, maybe don't. We'll see
    // combine these into an array. Yes this is how it comes
    strIngredient1?: string
    strIngredient2?: string
    strIngredient3?: string
    strIngredient4?: string
    strIngredient5?: string
    strIngredient6?: string
    strIngredient7?: string
    strIngredient8?: string
    strIngredient9?: string
    strIngredient10?: string
    strIngredient11?: string
    strIngredient12?: string
    strIngredient13?: string
    strIngredient14?: string
    strIngredient15?: string
    strIngredient16?: string
    strIngredient17?: string
    strIngredient18?: string
    strIngredient19?: string
    strIngredient20?: string
    // combine into an array
    strMeasure1?: string
    strMeasure2?: string
    strMeasure3?: string
    strMeasure4?: string
    strMeasure5?: string
    strMeasure6?: string
    strMeasure7?: string
    strMeasure8?: string
    strMeasure9?: string
    strMeasure10?: string
    strMeasure11?: string
    strMeasure12?: string
    strMeasure13?: string
    strMeasure14?: string
    strMeasure15?: string
    strMeasure16?: string
    strMeasure17?: string
    strMeasure18?: string
    strMeasure19?: string
    strMeasure20?: string
}

// This is the state that is handled for adding or retrieving recipes with a database
// The RetrieveState will be owned by the home page (where it would be retrieved), but the submit state
// will be owned on the form page

// This handles the submitting of a recipe. It has no success state because the result will be a redirect to a display
type DatabaseSubmitState =
    | {status: 'editing', recipe: Recipe}
    | {status: 'submitting', recipe: Recipe}
    | {status: 'error', recipe: Recipe, message: string}

type DatabaseRetrieveState =
    | {status: 'retrieving', id: string}
    | {status: 'error', message: string}
    | {status: 'success', recipe: Recipe}
