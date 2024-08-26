// Filename: App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Landing Page */}
          <Route path='/' element={<LandingPage />} />

          {/* Login Page */}
          <Route path='/login' element={<LoginPage />} />

          {/* Signup Page */}
          <Route path='/signup' element={<SignupPage />} />

          {/* Forgot Password Page */}
          <Route path='/forgot' element={<ForgotPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
