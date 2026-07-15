import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnimalDetail from './pages/AnimalDetail'
import './styles/app.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animal/:id" element={<AnimalDetail />} />
    </Routes>
  )
}
