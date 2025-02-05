import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Info, Ruler, PenTool } from 'lucide-react';
import Navbar from '../components/NavBar';
import { fetchProductById } from '../Redux/propertySlice';
import Spinner from '../components/Spinner';
import Footer from './Footer';

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.property);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error}</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <motion.main 
        className="max-w-6xl mx-auto pt-40 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-yellow-500/20" style={{ minHeight: '400px', maxHeight: '600px', width: '100%' }}>
              <motion.img
                src={product.images?.length > 0 ? product.images[selectedImage] : '/placeholder.svg'}
                alt={product.product.title || 'Product Image'}
                className="object-contain w-full h-full"
                style={{ maxHeight: '600px' }}
                loading='lazy'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.div 
              className="flex gap-2 overflow-x-auto pb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {product.images?.length > 0 ? (
                product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden relative flex-shrink-0 ${
                      selectedImage === index ? 'border-yellow-500' : 'border-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={img || "/placeholder.svg"} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="object-cover w-full h-full" 
                      loading='lazy' 
                    />
                  </motion.button>
                ))
              ) : (
                <span>No images available</span>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold">{product.product.title}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-yellow-500">
                ₹{Number(product.product.price)?.toLocaleString('en-IN')}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-yellow-500 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-6 h-6" />
                <h3 className="font-semibold">Product details</h3>
              </div>
              <ul className="space-y-2">
                {product.product.description.split('\n').map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="bg-yellow-500 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-6 h-6" />
                <h3 className="font-semibold">Dimensions</h3>
              </div>
              <ul className="space-y-2">
                {product.product.dimension.split('\n').map((dim, index) => (
                  <li key={index}>{dim}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="bg-yellow-500 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-6 h-6" />
                <h3 className="font-semibold">Services</h3>
              </div>
              <ul className="space-y-2">
                {product.product.services.split('\n').map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
      <Footer/>
    </div>
  );
}
