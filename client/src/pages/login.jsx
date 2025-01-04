import { User, Search, ShoppingCart } from 'lucide-react';
import logo from '../assets/logo.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden">
      {/* Background Image Section */}
      <div
        className="absolute top-0 left-0 w-[60%] h-full bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: 'center', // Ensure the logo stays centered
        }}
      ></div>

      {/* Semi-transparent Overlay for Visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full px-4">
        {/* Login Form Section */}
        <div className="w-[60%] max-w-2xl bg-white/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
          {/* User Icon */}
          <div className="flex justify-center mb-8">
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
              <a
                href="#"
                className="text-gray-500 hover:text-amber-400 transition-colors"
              >
                CREATE NEW ACCOUNT
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-amber-400 transition-colors"
              >
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
  );
}
