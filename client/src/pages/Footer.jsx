import { Facebook, Twitter, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-yellow-400/10 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* First Row - Main Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/" className="text-amber-400 hover:text-amber-300 transition-colors">
              Home
            </Link>
            {/* <Link to="/blogs" className="text-amber-400 hover:text-amber-300 transition-colors">
              Blog
            </Link> */}
            <Link to="/about" className="text-amber-400 hover:text-amber-300 transition-colors">
              About
            </Link>
            {/* <Link to="/product" className="text-amber-400 hover:text-amber-300 transition-colors">
              Product
            </Link> */}
            <Link to="/contact" className="text-amber-400 hover:text-amber-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Second Row - Existing Content */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0">
          {/* Social Media - Left Side */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/share/157qpcZmrQ/?mibextid=wwXIfr"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/indwpcdesire?s=21"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/premium.wpc.doorframewallpanel?igsh=MTF1OGtqeDN5ZHowcQ%3D%3D&utm_source=qr"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Centered Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/privacy-policy" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Terms and Conditions
            </Link>
            <Link to="/disclaimer" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Disclaimer
            </Link>
            <Link to="/sitemap" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Logo - Right Side */}
          <div className="text-center md:text-right">
            <img
              src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
              alt="SARS Logo"
              className="w-24 h-24 object-contain mb-4 md:mb-0 mx-auto md:mx-0"
            />
            <p className="text-amber-400 text-sm">Design Your Dream Door</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

