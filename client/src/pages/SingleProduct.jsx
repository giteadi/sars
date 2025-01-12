import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Star, Info, Ruler, PenToolIcon as Tools } from 'lucide-react';
import Footer from './Footer';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { fetchProductById } from '../redux/propertySlice';

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.property);
  const [selectedImage, setSelectedImage] = useState(0);
console.log(product)
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); // Dispatch action to fetch product by ID
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;
  }

  // Ensure `product` is not null/undefined
  const { title, price, description, dimension, services, images } = product || {};

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-40">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-500/20">
              {/* Displaying the image with a fallback */}
              <img
                src={images?.length > 0 ? images[selectedImage] : '/placeholder.svg'}
                alt={title || 'Product Image'}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {images?.length > 0 ? (
                images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden relative flex-shrink-0 ${
                      selectedImage === index ? 'border-yellow-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))
              ) : (
                <span>No images available</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">{product.product.title|| "Product Title"}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-yellow-500">₹{Number(product.product.price)?.toLocaleString('en-IN') || "Price not available"}</span>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors">
                Buy Now
              </button>
              <button
                className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => navigate('/cart')}
              >
                Add to Cart
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
        {product.product.description.split('\n').map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    </div>
    <div className="bg-yellow-500 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-6 h-6" />
        <h3 className="font-semibold">Dimensions</h3>
      </div>
      <ul className="space-y-2">
        {product.product.dimension.split('\n').map((dim, index) => (
          <li key={index}>{dim}</li>
        ))}
      </ul>
    </div>
    <div className="bg-yellow-500 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Tools className="w-6 h-6" />
        <h3 className="font-semibold">Services</h3>
      </div>
      <ul className="space-y-2">
        {product.product.services.split('\n').map((service, index) => (
          <li key={index}>{service}</li>
        ))}
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

      <Footer />
    </div>
  );
}
