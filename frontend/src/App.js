import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom'; // Import matchPath
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
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage'
import UpdateMenuItems from './pages/UpdateMenuItems';
import { Superscript } from 'lucide-react';
import authStore from './store/auth.store';

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
  const { userData } = authStore();

  const isAdmin = userData && userData.user.role === 'admin';
  const isSuperAdmin = userData && userData.user.role === 'super-admin';

  // Use matchPath to determine if the current path matches the dynamic routes
  const shouldHideFooter = ['/signup', '/forgot', '/create-restaurant', '/dashboard', '/admin', '/super-admin'].includes(location.pathname) ||
    matchPath('/reset-password/:resetToken', location.pathname);

  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path='/' element={<LandingPage />} />

        {/* Login Page */}
        <Route path='/login' element={!userData ? <LoginPage /> : <LandingPage />} />

        {/* Signup Page */}
        <Route path='/signup' element={!userData ? <SignupPage /> : <LandingPage />} />

        {/* Forgot Password Page */}
        <Route path='/forgot' element={!userData ? <ForgotPasswordPage /> : <LandingPage />} />

        {/* All Restaurants Page */}
        <Route path='/restaurants' element={<AllRestaurantsPage />} />

        {/* Restaurant Detail Page */}
        <Route path='/restaurant/:restID' element={<RestaurantDetail />} />

        {/* Reset Password */}
        <Route path="/reset-password/:resetToken" element={!userData ? <ResetPassword /> : <LandingPage />} />

        {/* Create Restaurant Page */}
        {/* <Route path='/create-restaurant' element={<CreateRestaurantPage />} /> */}

        {/* Create Menu Page */}
        <Route path='/create-menu' element={<CreateMenu />} />

        {/* Update Menu Page */}
        <Route path='/update-menu/:menuItemId' element={isAdmin ? <UpdateMenuItems /> : <LandingPage />} />

        {/* Checkout Page */}
        <Route path='/checkout' element={<CheckoutPage />} />

        {/* Order Confirmation */}
        <Route path='/order/confirmation' element={<OrderConfirmationPage />} />

        {/* User Dashboard */}
        <Route path='/dashboard' element={<UserDashboardPage />} />

        {/* Admin Page */}
        <Route path='/admin' element={isAdmin ? <AdminPage /> : <LandingPage />} />

        {/* SuperAdmin Page */}
        <Route path='/super-admin' element={isSuperAdmin ? <SuperAdminPage /> : <LandingPage />} />

      </Routes>

      {/* Conditionally render the Footer */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
