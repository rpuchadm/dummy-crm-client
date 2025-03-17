// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import ListArticulos from "./components/Articulos/ListArticulos"
import ArticuloContainer from "./components/Articulos/ArticuloContainer"
import ListProfiles from "./components/Profile/ListProfiles"
import ProfileContainer from "./components/Profile/ProfileContainer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listarticulos" element={<ListArticulos />} />
        <Route path="/articulo/:id" element={<ArticuloContainer />} />
        <Route path="/listprofiles" element={<ListProfiles />} />
        <Route path="/profile/:id" element={<ProfileContainer />} />
      </Routes>
    </Router>
  )
}

export default App
