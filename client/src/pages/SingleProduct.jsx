import { ShoppingCart, Star, Info, Ruler, PenToolIcon as Tools } from 'lucide-react'
import { useState } from 'react'
import Footer from './Footer'
import Navbar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
const nav=useNavigate();
  const images = [
    '/placeholder.svg?height=400&width=200',
    '/placeholder.svg?height=400&width=200',
    '/placeholder.svg?height=400&width=200',
    '/placeholder.svg?height=400&width=200'
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cart Header */}
      <Navbar/>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-500/20">
              <img
                src={images[selectedImage]}
                alt="Wooden Door"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden relative ${
                    selectedImage === index ? 'border-yellow-500' : 'border-gray-700'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">WOODEN DOOR, (4×3) FRAME</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-yellow-500">₹6,337</span>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors">
                Buy Now
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors" onClick={()=>{
                nav('/cart')
              }}>
                Add Cart
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-6 h-6" />
                <h3 className="font-semibold">Product details</h3>
              </div>
              <ul className="space-y-2">
                <li>Premium wood quality</li>
                <li>Durable finish</li>
                <li>Weather resistant</li>
              </ul>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-6 h-6" />
                <h3 className="font-semibold">Dimensions</h3>
              </div>
              <ul className="space-y-2">
                <li>Height: 4 feet</li>
                <li>Width: 3 feet</li>
                <li>Thickness: 35mm</li>
              </ul>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Tools className="w-6 h-6" />
                <h3 className="font-semibold">Services</h3>
              </div>
              <ul className="space-y-2">
                <li>Free installation</li>
                <li>2 year warranty</li>
                <li>24/7 support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-gray-400">(24 reviews)</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  )
}
