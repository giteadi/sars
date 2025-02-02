import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User, Search, ShoppingCart } from 'lucide-react';
import { loginUser } from '../Redux/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }))
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          alert('Login failed. Please try again.');
        });
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="w-16 h-16">
            <img
              src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center bg-zinc-950/50 backdrop-blur-sm px-8 py-2 rounded-full">
            <Link to="/" className="mx-4 text-white hover:text-amber-400 transition-colors">
              HOME
            </Link>
            <Link to="/product" className="mx-4 text-white hover:text-amber-400 transition-colors">
              PRODUCT
            </Link>
            <Link to="/blogs" className="mx-4 text-white hover:text-amber-400 transition-colors">
              BLOG
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <User className="w-5 h-5 text-amber-400" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Background Image Section */}
      <div
        className="absolute top-0 left-0 w-full md:w-[60%] h-full bg-no-repeat bg-cover opacity-20"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png)`,
          backgroundPosition: 'center',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen p-4">
        {/* Login Form Section */}
        <div className="w-full md:w-[90%] lg:w-[60%] max-w-2xl bg-white/10 backdrop-blur-md border border-white/30 p-6 md:p-12 rounded-3xl shadow-lg">
          {/* User Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-400 flex items-center justify-center">
              <User className="w-10 h-10 md:w-14 md:h-14 text-amber-400" />
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="EMAIL ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 text-sm pt-2">
              <Link
                to="/register"
                className="text-gray-500 hover:text-amber-400 transition-colors text-center md:text-left"
              >
                CREATE NEW ACCOUNT
              </Link>
              <Link
                to="/forgot-password"
                className="text-gray-500 hover:text-amber-400 transition-colors text-center md:text-left"
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4d4d33] hover:bg-[#5c5c3d] text-amber-400 font-bold py-3 rounded-lg transition-all mt-8"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
