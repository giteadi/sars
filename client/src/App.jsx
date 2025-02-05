import { Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LandingPage from "./components/LandingPage"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/Register"
import ProductPage from "./pages/ProductPage"
import BlogPage from "./pages/Blogs"
import SingleProduct from "./pages/SingleProduct"
import Cart from "./components/Cart"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import SingleBlogPage from "./pages/SingleBlog"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import Sitemap from "./pages/Sitemap"
import Disclaimer from "./pages/Disclamer"
import Dashboard from "./components/AdminPanel/Dashboard"
import AdminPanel from "./components/AdminPanel/AdminPanel"
import FAQ from "./pages/FAQ"
function App() {
  // Get the user's authentication and role from the Redux store
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // Check if the user is an admin
  const isAdmin = user?.role === 'admin'

  // Route protection for the admin dashboard
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated || !isAdmin) {
      // Redirect to login if not authenticated or not an admin
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/singleblog/:id" element={<SingleBlogPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path='/faq' element={<FAQ />} />
        
        {/* Protected Route for Admin */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
