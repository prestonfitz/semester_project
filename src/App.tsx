import './App.css'
import RecipeViewer from './RecipeViewer.tsx'
import Search from './search.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <section>
        <div>
          <h1>Presipes</h1>
          <p>
            Find or record recipes
          </p>
        </div>
      </section>
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/recipe/:source/:id" element={<RecipeViewer />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
