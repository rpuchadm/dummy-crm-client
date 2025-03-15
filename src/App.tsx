// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import ListArticulos from "./components/Articulos/ListArticulos"
import ArticuloContainer from "./components/Articulos/ArticuloContainer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listarticulos" element={<ListArticulos />} />
        <Route path="/articulo/:id" element={<ArticuloContainer />} />
      </Routes>
    </Router>
  )
}

export default App
