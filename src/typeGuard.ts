import type {ApiMeal, ApiResponse} from './types.ts'

// check that the response is a valid response. The meals array may return no results; that is acceptable
export function isApiResponse(t: unknown): t is ApiResponse {
    return typeof t === 'object' &&
        t !== null &&
        typeof (t as any).meals === 'object' &&
        ((t as any).meals === null || (typeof (t as any).meals.length === 'number' && isApiMealArray((t as any).meals)))
}

function isApiMealArray(t: unknown[]): t is ApiMeal[] {
    if (t.length === 0) {
        return true
    }

    for (const meal of t) {
        if (!isApiMeal(meal)) {
            return false
        }
    }

    return true
}

function isApiMeal(t: unknown): t is ApiMeal {
    return typeof (t as any).idMeal === 'string' &&
        typeof (t as any).strMeal === 'string' &&
        typeof (t as any).strCategory === 'string' &&
        typeof (t as any).strArea === 'string' &&
        typeof (t as any).strInstructions === 'string' &&
        typeof (t as any).strMealThumb === 'string' &&
        ((typeof (t as any).strIngredient1 === 'object' && (t as any).strIngredient1 === null) || typeof (t as any).strIngredient1 ==='string') &&
        ((typeof (t as any).strIngredient2 === 'object' && (t as any).strIngredient2 === null) || typeof (t as any).strIngredient2 ==='string') &&
        ((typeof (t as any).strIngredient3 === 'object' && (t as any).strIngredient3 === null) || typeof (t as any).strIngredient3 ==='string') &&
        ((typeof (t as any).strIngredient4 === 'object' && (t as any).strIngredient4 === null) || typeof (t as any).strIngredient4 ==='string') &&
        ((typeof (t as any).strIngredient5 === 'object' && (t as any).strIngredient5 === null) || typeof (t as any).strIngredient5 ==='string') &&
        ((typeof (t as any).strIngredient6 === 'object' && (t as any).strIngredient6 === null) || typeof (t as any).strIngredient6 ==='string') &&
        ((typeof (t as any).strIngredient7 === 'object' && (t as any).strIngredient7 === null) || typeof (t as any).strIngredient7 ==='string') &&
        ((typeof (t as any).strIngredient8 === 'object' && (t as any).strIngredient8 === null) || typeof (t as any).strIngredient8 ==='string') &&
        ((typeof (t as any).strIngredient9 === 'object' && (t as any).strIngredient9 === null) || typeof (t as any).strIngredient9 ==='string') &&
        ((typeof (t as any).strIngredient10 === 'object' && (t as any).strIngredient10 === null) || typeof (t as any).strIngredient10 ==='string') &&
        ((typeof (t as any).strIngredient11 === 'object' && (t as any).strIngredient11 === null) || typeof (t as any).strIngredient11 ==='string') &&
        ((typeof (t as any).strIngredient12 === 'object' && (t as any).strIngredient12 === null) || typeof (t as any).strIngredient12 ==='string') &&
        ((typeof (t as any).strIngredient13 === 'object' && (t as any).strIngredient13 === null) || typeof (t as any).strIngredient13 ==='string') &&
        ((typeof (t as any).strIngredient14 === 'object' && (t as any).strIngredient14 === null) || typeof (t as any).strIngredient14 ==='string') &&
        ((typeof (t as any).strIngredient15 === 'object' && (t as any).strIngredient15 === null) || typeof (t as any).strIngredient15 ==='string') &&
        ((typeof (t as any).strIngredient16 === 'object' && (t as any).strIngredient16 === null) || typeof (t as any).strIngredient16 ==='string') &&
        ((typeof (t as any).strIngredient17 === 'object' && (t as any).strIngredient17 === null) || typeof (t as any).strIngredient17 ==='string') &&
        ((typeof (t as any).strIngredient18 === 'object' && (t as any).strIngredient18 === null) || typeof (t as any).strIngredient18 ==='string') &&
        ((typeof (t as any).strIngredient19 === 'object' && (t as any).strIngredient19 === null) || typeof (t as any).strIngredient19 ==='string') &&
        ((typeof (t as any).strIngredient20 === 'object' && (t as any).strIngredient20 === null) || typeof (t as any).strIngredient20 ==='string') &&
        ((typeof (t as any).strMeasure1 === 'object' && (t as any).strMeasure1 === null) || typeof (t as any).strMeasure1 ==='string') &&
        ((typeof (t as any).strMeasure2 === 'object' && (t as any).strMeasure2 === null) || typeof (t as any).strMeasure2 ==='string') &&
        ((typeof (t as any).strMeasure3 === 'object' && (t as any).strMeasure3 === null) || typeof (t as any).strMeasure3 ==='string') &&
        ((typeof (t as any).strMeasure4 === 'object' && (t as any).strMeasure4 === null) || typeof (t as any).strMeasure4 ==='string') &&
        ((typeof (t as any).strMeasure5 === 'object' && (t as any).strMeasure5 === null) || typeof (t as any).strMeasure5 ==='string') &&
        ((typeof (t as any).strMeasure6 === 'object' && (t as any).strMeasure6 === null) || typeof (t as any).strMeasure6 ==='string') &&
        ((typeof (t as any).strMeasure7 === 'object' && (t as any).strMeasure7 === null) || typeof (t as any).strMeasure7 ==='string') &&
        ((typeof (t as any).strMeasure8 === 'object' && (t as any).strMeasure8 === null) || typeof (t as any).strMeasure8 ==='string') &&
        ((typeof (t as any).strMeasure9 === 'object' && (t as any).strMeasure9 === null) || typeof (t as any).strMeasure9 ==='string') &&
        ((typeof (t as any).strMeasure10 === 'object' && (t as any).strMeasure10 === null) || typeof (t as any).strMeasure10 ==='string') &&
        ((typeof (t as any).strMeasure11 === 'object' && (t as any).strMeasure11 === null) || typeof (t as any).strMeasure11 ==='string') &&
        ((typeof (t as any).strMeasure12 === 'object' && (t as any).strMeasure12 === null) || typeof (t as any).strMeasure12 ==='string') &&
        ((typeof (t as any).strMeasure13 === 'object' && (t as any).strMeasure13 === null) || typeof (t as any).strMeasure13 ==='string') &&
        ((typeof (t as any).strMeasure14 === 'object' && (t as any).strMeasure14 === null) || typeof (t as any).strMeasure14 ==='string') &&
        ((typeof (t as any).strMeasure15 === 'object' && (t as any).strMeasure15 === null) || typeof (t as any).strMeasure15 ==='string') &&
        ((typeof (t as any).strMeasure16 === 'object' && (t as any).strMeasure16 === null) || typeof (t as any).strMeasure16 ==='string') &&
        ((typeof (t as any).strMeasure17 === 'object' && (t as any).strMeasure17 === null) || typeof (t as any).strMeasure17 ==='string') &&
        ((typeof (t as any).strMeasure18 === 'object' && (t as any).strMeasure18 === null) || typeof (t as any).strMeasure18 ==='string') &&
        ((typeof (t as any).strMeasure19 === 'object' && (t as any).strMeasure19 === null) || typeof (t as any).strMeasure19 ==='string') &&
        ((typeof (t as any).strMeasure20 === 'object' && (t as any).strMeasure20 === null) || typeof (t as any).strMeasure20 ==='string')
}
