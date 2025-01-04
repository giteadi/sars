import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import FAQ from "../pages/FAQ";
import Carosal from "./Carosal";
import Reviews from "../pages/Reviews";
import Footer from "../pages/Footer";


export default function LandingPage() {
  return (
    <div className="w-full bg-black text-white">
     
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-2 border-amber-400/20">
          <div className="w-12 h-12">
            <img
          src="https://res.cloudinary.com/bazeercloud/image/upload/v1736017187/logo_gqb8jl.png"
          alt="SARS Logo"
          className="w-full h-full object-contain"
            />
          </div>
        </header>

        {/* Hero Section */}
     <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
  <div className="absolute inset-0 bg-yellow-200/10 z-0"></div> {/* Yellow background with transparency */}
  <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
    <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-400 leading-tight">
        SARS
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-amber-400">
        Make your home
        <br />
        Creative and Unique
      </p>
      <p className="text-sm md:text-base lg:text-lg text-amber-400">
        DESIGN YOUR DREAM DOOR
      </p>
      <button className="bg-amber-400 text-black px-6 py-2 rounded-full hover:bg-amber-300 transition duration-300">
        Explore Now
      </button>
    </div>

    {/* Door Frame in the Background */}
    <div className="absolute inset-0 z-0 flex justify-center items-center">
      <img
        src="https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Grey_Door_frame-Photoroom_1_tvitxq.png"
        alt="Door Frame"
        className="w-full max-w-lg mx-auto h-auto object-contain opacity-60"
      />
    </div>

    {/* Front Door Image */}
    <div className="md:w-1/2 relative z-10">
      <img
        src="https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png"
        alt="Featured Door"
        className="w-full max-w-lg mx-auto h-auto object-contain"
      />
    </div>
  </div>
</section>


      {/* Product Section */}
      <Carosal />

      {/* Product Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">
          Product Features
        </h2>
        <div className="space-y-4 p-8 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm border border-amber-400/20">
          <div className="flex items-center space-x-4">
            <span className="text-amber-400 text-xl">✓</span>
            <p className="text-amber-400 text-lg">10 years assured warranty</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-amber-400 text-xl">✓</span>
            <p className="text-amber-400 text-lg">Water proof</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-amber-400 text-xl">✓</span>
            <p className="text-amber-400 text-lg">Durable and long-lasting</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Eco Friendly */}
      <section className="container mx-auto px-4 py-16">
    <div className="bg-yellow-400/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1736019937/rb_222_hokupo.png"
                alt="Eco Friendly"
                className="w-32 h-32 object-contain"
            />
            <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1736020045/rb_114044_u30hxx.png"
                alt="Certification"
                className="w-32 h-32 object-contain"
            />
        </div>
        <p className="text-left text-xl text-gray-400">ECO FRIENDLY</p>
    </div>
</section>

      {/* FAQs */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}
