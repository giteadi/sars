import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-zinc-900 text-white py-2 border-b border-amber-400/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-0">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/share/157qpcZmrQ/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/indwpcdesire?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/premium.wpc.doorframewallpanel?igsh=MTF1OGtqeDN5ZHowcQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm">
            <a 
              href="tel:+918770229706" 
              className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">+91 8770229706</span>
            </a>
            <a 
              href="mailto:wpcind@sarsdecors.com" 
              className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">wpcind@sarsdecors.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
