import './App.css'
import RecipeViewer from './RecipeViewer.tsx'
import Search from './search.tsx'
import RecipeForm from './RecipeForm.tsx'
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
            <Route path="/" element={<Search isLocal={false} />} />
            <Route path="/local" element={<Search isLocal={true} />} />
            <Route path="/recipe/:source/:id" element={<RecipeViewer />} />
            <Route path="/local/create" element={<RecipeForm />} />
            <Route path="/local/edit/:id" element={<RecipeForm />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
