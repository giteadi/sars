import { User, Mail, Lock, ShoppingCart } from 'lucide-react';
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-16 h-16">
            <img
            loading='lazy'
              src='https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png'
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center bg-zinc-950/50 backdrop-blur-sm px-8 py-2 rounded-full">
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
           <Link
             to='#'
              className="mx-4 text-white hover:text-amber-400 transition-colors"
            >
              HELPFUL TIPS
            </Link>
           <Link
             to='/blogs'
              className="mx-4 text-white hover:text-amber-400 transition-colors"
            >
              BLOG
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-2 hover:text-amber-400 transition-colors">
              <Mail className="w-6 h-6" />
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

      {/* Background Image Section */}
      <div
        className="absolute top-0 left-0 w-full sm:w-[60%] h-full bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png)`,
          backgroundPosition: 'center',
          loading: 'lazy',
          
        }}
      ></div>

      {/* Semi-transparent Overlay for Visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full px-4 mt-16 min-h-screen"> {/* Add mt-16 to add space */}
        {/* Register Form Section */}
        <div className="w-[60%] max-w-2xl bg-white/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
          {/* User Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full border-2 border-amber-400 flex items-center justify-center">
              <User className="w-14 h-14 text-amber-400" />
            </div>
          </div>

          {/* Register Form */}
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="FULL NAME"
                className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

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

            <div>
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                className="w-full h-12 bg-gray-800/50 rounded-lg px-4 text-amber-400 placeholder-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            <div className="flex justify-between text-sm pt-2">
             <Link
               to=''
                className="text-gray-500 hover:text-amber-400 transition-colors"
              >
                ALREADY HAVE AN ACCOUNT? LOGIN
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4d4d33] hover:bg-[#5c5c3d] text-amber-400 font-bold py-3 rounded-lg transition-all mt-8"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
