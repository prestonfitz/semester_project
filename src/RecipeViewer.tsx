import type {Recipe} from './types.ts'

export function RecipeViewer({recipe}: { recipe: Recipe }) {
    return (
        <div id={"recipe"}>
            <h2>{recipe.title}</h2>
            <p>{recipe.genre}</p>
            <p>{recipe.category}</p>

            <table>
                {recipe.ingredients.map((i) => (
                    <tr>
                        <td>{i.name}</td>
                        <td>{i.measurement}</td>
                    </tr>
                ))}
            </table>

            {recipe.instructions.map((i) => <p>{i}</p>)}
        </div>
    )
}

export default RecipeViewer

