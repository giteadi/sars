import { useState, useEffect } from "react"
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../Redux/AuthSlice"
import toast from "react-hot-toast"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".relative")) setIsUserDropdownOpen(false)
    }
    window.addEventListener("click", handleOutsideClick)
    return () => window.removeEventListener("click", handleOutsideClick)
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
    toast.success("Logout successful!")
  }

  const handleCartClick = () => navigate("/cart")

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? "md:w-4/5 md:rounded-full bg-white/10" : "w-full bg-zinc-950"
      } mx-auto backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-12 h-12 md:w-16 md:h-16">
          <img
            src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white" aria-label="Toggle menu">
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center space-x-4 ${
            isMenuOpen
              ? "flex absolute top-16 left-0 right-0 flex-col bg-zinc-950 border-t border-zinc-800 py-4 space-y-4 md:space-y-0 animate-in slide-in-from-top"
              : "hidden"
          } md:relative md:top-0 md:border-none md:py-0 md:bg-transparent`}
        >
          {["HOME", "PRODUCT", "BLOGS", "CONTACT", "ABOUT"].map((item) => (
            <Link
              key={item}
              to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
              className="mx-4 text-white hover:text-amber-400 transition-colors text-center md:text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Cart - Only shown when authenticated */}
          {/* {isAuthenticated && (
            <button onClick={handleCartClick} className="p-2 hover:text-amber-400 transition-colors relative">
              <FaShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          )} */}

          {/* User Dropdown */}
          <div className="relative flex items-center space-x-2">
            <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="p-2" aria-label="User menu">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <FaUser className="w-5 h-5 text-amber-400" />
              </div>
            </button>
            <p className="hidden md:block">{user ? user.name : "Guest"}</p>
            {isUserDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-md shadow-lg w-40 py-2 z-20 transition-all duration-300 ease-in-out">
                <div className="relative">
                  {isAuthenticated && user ? (
                    <>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

