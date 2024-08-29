import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Footer from './components/footer';
import AllRestaurantsPage from './pages/AllRestaurantsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainContent />
      </Router>
    </div>
  );
}

// Component to handle conditional rendering of Footer
function MainContent() {
  const location = useLocation();

  // Check if the current path is '/login' or '/signup'
  const shouldHideFooter = ['/login', '/signup', '/forgot'].includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path='/' element={<LandingPage />} />

        {/* Login Page */}
        <Route path='/login' element={<LoginPage />} />

        {/* Signup Page */}
        <Route path='/signup' element={<SignupPage />} />

        {/* Forgot Password Page */}
        <Route path='/forgot' element={<ForgotPasswordPage />} />

        {/* All Restaurants Page */}
        <Route path='/restaurants' element={<AllRestaurantsPage />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
