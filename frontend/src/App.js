import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Footer from './components/footer';
import AllRestaurantsPage from './pages/AllRestaurantsPage';
import ResetPassword from './components/resetPassword';
import RestaurantDetail from './pages/RestaurantDetail';
import CreateRestaurantPage from './pages/CreateRestaurantPage';
import CreateMenu from './pages/CreateMenuItems';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import UserDashboardPage from './pages/UserDashboardPage';
// import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Component to handle Navbar, Footer, and Main Content
function MainLayout() {
  const location = useLocation(); // Get the current route location

  // Conditionally hide Navbar for specific routes
  const shouldHideHeader = location.pathname === '/dashboard';

  // Use matchPath to determine if the current path matches the dynamic routes for Footer
  const shouldHideFooter = ['/login', '/signup', '/forgot', '/create-restaurant', "/dashboard"].includes(location.pathname) ||
    matchPath('/reset-password/:resetToken', location.pathname);

  return (
    <div className="App">
      {/* Conditionally render the Navbar */}
      {!shouldHideHeader && <Navbar />}

      {/* Main Content */}
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

        {/* Restaurant Detail Page */}
        <Route path='/restaurant/:restID' element={<RestaurantDetail />} />

        {/* Reset Password */}
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Create Restaurant Page */}
        <Route path='/create-restaurant' element={<CreateRestaurantPage />} />

        {/* Create Menu Page */}
        <Route path='/create-menu' element={<CreateMenu />} />

        {/* Checkout Page */}
        <Route path='/checkout' element={<CheckoutPage />} />

        {/* Order Confirmation */}
        <Route path='/confirm' element={<OrderConfirmationPage />} />

        {/* User Dashboard */}
        <Route path='/dashboard' element={<UserDashboardPage />} />

        {/* Admin Page */}
        {/* <Route path='/admin' element={<AdminPage />} /> */}
      </Routes>

      {/* Conditionally render the Footer */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;
