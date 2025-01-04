import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
export default function Footer() {
    return (
        <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
                alt="SARS Logo"
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-amber-400 text-sm">Design Your Dream Door</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <a href="#" className="text-amber-400 hover:text-amber-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-amber-400 hover:text-amber-300">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-amber-400 hover:text-amber-300">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="flex space-x-6 text-sm text-amber-400">
                <a href="#" className="hover:text-amber-300">Social</a>
                <a href="#" className="hover:text-amber-300">Contact</a>
                <a href="#" className="hover:text-amber-300">About</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}