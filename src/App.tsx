import './App.css'
import type {Recipe} from './types.ts'
import RecipeViewer from './RecipeViewer.tsx'

function App() {
  const testRecipe: Recipe = {
    id: "1",
    title: "test",
    genre: "italian",
    category: "dinner",
    ingredients: [{name: "noodles", measurement: "1 lbs"}, {name: "sauce", measurement: "1 can"}],
    instructions: ["you put your right hand in", "you put your right hand out", "you put your right hand in", "and you shake it all about"]
  }
  return (
    <>
      <section>
        <div>
          <h1>Presipes</h1>
          <p>
            Find or record recipes
          </p>
        </div>
      </section>

      <section>
        {/*<Search />*/}
        <RecipeViewer recipe={testRecipe} />
      </section>
    </>
  )
}

export default App
