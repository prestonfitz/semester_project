import './App.css'
import type {Recipe} from './types.ts'
import RecipeViewer from './RecipeViewer.tsx'
import Search from './search.tsx'
import {useState} from 'react'

function App() {
    const [recipe, changeRecipe] = useState<Recipe | null>(null)
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
          {recipe === null ?
              <Search /> :
              <RecipeViewer recipe={recipe} />
          }
      </section>
    </>
  )
}

export default App
