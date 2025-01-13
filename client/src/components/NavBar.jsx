import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/AuthSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { cartItems } = useSelector((state) => state.cart); // Get cart items from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logout successful!');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled
          ? 'w-4/5 rounded-full bg-white/10'
          : 'w-full bg-zinc-950'
      } mx-auto backdrop-blur-sm`}
    >
      <div className="container px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-16 h-16">
          <img
            src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hamburger Icon (for mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center px-8 py-2 rounded-full space-x-4 ${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-16 left-0 right-0 bg-zinc-950 md:relative md:flex-row md:space-x-8 md:top-0`}
        >
          <Link
            to="/"
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            HOME
          </Link>
          <Link
            to="/product"
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            PRODUCT
          </Link>
          <Link
            to="/blogs"
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            BLOG
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button 
            className="p-2 hover:text-amber-400 transition-colors relative"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* User Icon with Dropdown */}
          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="p-2"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <FaUser className="w-5 h-5 text-amber-400"/>
              </div>
            </button>
            <p>{user ? user.name : 'Guest'}</p>
            {/* Glassmorphism Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-md shadow-lg w-40 py-2 z-20">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
