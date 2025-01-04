import { User, Search, ShoppingCart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="hidden md:flex items-center bg-zinc-950/50 backdrop-blur-sm px-8 py-2 rounded-full">
            <a href="#" className="mx-4 text-white hover:text-amber-400 transition-colors">HOME</a>
            <a href="#" className="mx-4 text-white hover:text-amber-400 transition-colors">PRODUCT</a>
            <a href="#" className="mx-4 text-white hover:text-amber-400 transition-colors">HELPFUL TIPS</a>
            <a href="#" className="mx-4 text-white hover:text-amber-400 transition-colors">BLOG</a>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="p-2 hover:text-amber-400 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:text-amber-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <User className="w-5 h-5 text-amber-400" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Title Section */}
        <div className="relative inline-block text-center">
          <h1 className="text-6xl font-bold text-amber-400 relative z-10">
            LOGIN
          </h1>
          <div className="absolute -inset-4 bg-amber-400/20 blur-xl rounded-full -z-10"></div>
        </div>

        {/* Login Form Section */}
        <div className="max-w-md mx-auto mt-32">
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -left-1/2 top-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px]"></div>
            <div className="absolute -right-1/2 bottom-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px]"></div>

            {/* User Icon */}
            <div className="flex justify-center mb-12">
              <div className="w-24 h-24 rounded-full border-2 border-amber-400 flex items-center justify-center">
                <User className="w-14 h-14 text-amber-400" />
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ID"
                  className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              <div className="flex justify-between text-sm pt-2">
                <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                  CREATE NEW ACCOUNT
                </a>
                <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">
                  FORGOT PASSWORD?
                </a>
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
    </div>
  );
}
