import './App.css'
import type {Recipe} from './types.ts'
import RecipeViewer from './RecipeViewer.tsx'
import Search from './search.tsx'

function App() {
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
        <Search />
        {/*<RecipeViewer recipe={testRecipe} />*/}
      </section>
    </>
  )
}

export default App
