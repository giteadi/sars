import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react'

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  const products = [
    { id: 1, name: 'Wood Door', image: '/placeholder.svg' },
    { id: 2, name: 'Wood Door', image: '/placeholder.svg' },
    { id: 3, name: 'Wood Door', image: '/placeholder.svg' },
    { id: 4, name: 'Frame', image: '/placeholder.svg' },
  ]

  const faqs = [
    { id: 1, question: 'Frequently Asked Question 1', answer: 'Answer to question 1' },
    { id: 2, question: 'Frequently Asked Question 2', answer: 'Answer to question 2' },
    { id: 3, question: 'Frequently Asked Question 3', answer: 'Answer to question 3' },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="w-full bg-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="w-12 h-12">
          <img
            src="/placeholder.svg"
            alt="SARS Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-amber-400 hover:text-amber-300">HOME</a>
          <a href="#" className="text-amber-400 hover:text-amber-300">ABOUT</a>
          <a href="#" className="text-amber-400 hover:text-amber-300">PRODUCTS</a>
          <a href="#" className="text-amber-400 hover:text-amber-300">BLOG</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-400 leading-tight">
              SARS
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-amber-400">
              Make your home<br />
              Creative and Unique
            </p>
            <p className="text-sm md:text-base lg:text-lg text-amber-400">
              DESIGN YOUR DREAM DOOR
            </p>
            <button className="bg-amber-400 text-black px-6 py-2 rounded-full hover:bg-amber-300 transition duration-300">
              Explore Now
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg"
              alt="Featured Door"
              className="w-full max-w-lg mx-auto h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Our Products</h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-[200px] h-[400px] object-contain"
                    />
                    <p className="mt-4 text-lg text-amber-400">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </section>

      {/* Product Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Product Features</h2>
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
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-xl bg-gradient-to-br from-amber-400/10 to-transparent backdrop-blur-sm border border-amber-400/20">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-2xl flex items-center justify-center ${
                index % 2 === 0 
                ? 'bg-gray-800/50 backdrop-blur-sm' 
                : 'bg-amber-400'
              }`}
            >
              <span className="text-3xl">★★★★★</span>
            </div>
          ))}
        </div>
      </section>

      {/* Eco Friendly */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gray-800 p-8 rounded-xl">
          <div className="flex justify-center space-x-8 mb-4">
            <img
              src="/placeholder.svg"
              alt="Eco Friendly"
              className="w-24 h-24 object-contain"
            />
            <img
              src="/placeholder.svg"
              alt="Certification"
              className="w-24 h-24 object-contain"
            />
          </div>
          <p className="text-center text-lg text-gray-400">
            ECO FRIENDLY
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-amber-400 text-lg"
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    openFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === faq.id && (
                <div className="px-6 py-4 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <img
                src="/placeholder.svg"
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
    </div>
  )
}

