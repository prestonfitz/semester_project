export const testRecipe: Recipe = {
    id: "1",
    title: "test",
    genre: "italian",
    category: "dinner",
    ingredients: [{name: "noodles", measurement: "1 lbs"}, {name: "sauce", measurement: "1 can"}],
    instructions: ["you put your right hand in", "you put your right hand out", "you put your right hand in", "and you shake it all about"]
}
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

export type ApiStatus =
    | {status: 'idle'}
    | {status: 'loading'}
    | {status: 'error', error: FetchError}
    | {status: 'success', data: Recipe[]}

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

export function apiMealToRecipe(meal: ApiMeal): Recipe {
    const instructions = meal.strInstructions.split('\r\n')

    const ingredients: Ingredient[] = []

    for (let index = 1; index <= 20; index++) {
        const ingredient = createIngredient(
            meal[`strIngredient${index}` as keyof ApiMeal],
            meal[`strMeasure${index}` as keyof ApiMeal]
        )

        if (ingredient !== null) {
            ingredients.push(ingredient)
        }
    }

    return {
        id: meal.idMeal,
        title: meal.strMeal,
        genre: meal.strArea,
        category: meal.strCategory,
        instructions: instructions,
        ingredients: ingredients
    }


}

// If the ingredient and the measurement are null or empty, return null. Otherwise, create an ingredient
function createIngredient(ingredient: string | null, measurement: string | null): Ingredient | null {
    if (ingredient === null) {
        ingredient = ''
    }

    if (measurement === null) {
        measurement = ''
    }

    if (ingredient.trim() === '' && measurement.trim() === '') {
        return null
    }

    return {name: ingredient, measurement: measurement}
}

// This is the data I will get back from the API matched to what it will map to from the above type
export type ApiResponse = {
    meals: ApiMeal[] | null
}

export type ApiMeal = {
    idMeal: string // id
    strMeal: string // title
    strCategory: string // category
    strArea: string // genre
    strInstructions: string // instructions; split on \r\n
    strMealThumb: string // picture. Maybe use, maybe don't. We'll see
    // combine these into an array. Yes this is how it comes
    strIngredient1: string | null
    strIngredient2: string | null
    strIngredient3: string | null
    strIngredient4: string | null
    strIngredient5: string | null
    strIngredient6: string | null
    strIngredient7: string | null
    strIngredient8: string | null
    strIngredient9: string | null
    strIngredient10: string | null
    strIngredient11: string | null
    strIngredient12: string | null
    strIngredient13: string | null
    strIngredient14: string | null
    strIngredient15: string | null
    strIngredient16: string | null
    strIngredient17: string | null
    strIngredient18: string | null
    strIngredient19: string | null
    strIngredient20: string | null
    // combine into an array
    strMeasure1: string | null
    strMeasure2: string | null
    strMeasure3: string | null
    strMeasure4: string | null
    strMeasure5: string | null
    strMeasure6: string | null
    strMeasure7: string | null
    strMeasure8: string | null
    strMeasure9: string | null
    strMeasure10: string | null
    strMeasure11: string | null
    strMeasure12: string | null
    strMeasure13: string | null
    strMeasure14: string | null
    strMeasure15: string | null
    strMeasure16: string | null
    strMeasure17: string | null
    strMeasure18: string | null
    strMeasure19: string | null
    strMeasure20: string | null
}
