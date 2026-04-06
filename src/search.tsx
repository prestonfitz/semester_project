import {useState} from 'react'

function Search() {
    const [searchTerm, changeSearchTerm] = useState<string>()
    const change = (value: string) =>{
        changeSearchTerm(value)
    }

    return (
        <>
            <h2>Find New Recipes</h2>
            <form>
                <label htmlFor={"recipeSearch"}>Search Recipes by Key Word</label>
                <input id={"recipeSearch"} value={searchTerm} onChange={(e) => change(e.target.value)} />
                <button type={"submit"}>Search</button>
            </form>
        </>
    )
}

export default Search