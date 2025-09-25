import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/AuthPages/LoginPage'
import RegisterPage from './Pages/AuthPages/RegisterPage'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App

          