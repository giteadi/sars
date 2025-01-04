import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <button className="p-2 hover:text-amber-400 transition-colors">
            <FaShoppingCart className="w-6 h-6" />
          </button>
          <button className="p-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <FaUser className="w-5 h-5 text-amber-400" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
