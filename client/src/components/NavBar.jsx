import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled
          ? 'w-4/5 rounded-full bg-white/10'  // Transparent white when scrolled
          : 'w-full bg-zinc-950'  // Solid black background by default
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center px-8 py-2 rounded-full">
          <Link
           to='/'
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            HOME
         </Link>
         <Link
           to='/product'
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            PRODUCT
         </Link>
         {/* <Link
           to='/'
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            HELPFUL TIPS
         </Link> */}
         <Link
           to='/'
            className="mx-4 text-white hover:text-amber-400 transition-colors"
          >
            BLOG
         </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="p-2 hover:text-amber-400 transition-colors">
            <FaSearch className="w-6 h-6" />
          </button>
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
