// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"
import Person from "./components/person/Person"
import ListPersons from "./components/listpersons/ListPersons"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/list" element={<ListPersons />} />
        <Route path="/person" element={<Person />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
