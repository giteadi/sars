'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FAQ from "./FAQ";
import Navbar from "../components/NavBar";
import { fetchProducts } from '../Redux/propertySlice';
import Spinner from "../components/Spinner";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.property);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const filterProducts = (priceRange) => {
    if (priceRange === "all") {
      setFilteredProducts(products);
    } else {
      const [min, max] = priceRange.split("-").map(Number);
      const filtered = products.filter(
        (product) => product.price >= min && product.price <= max
      );
      setFilteredProducts(filtered);
    }
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  const defaultImage = "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png";

  return (
    <div className="w-full bg-black text-white relative">
      <Navbar />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-black rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Filter Products</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => filterProducts("all")}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
              >
                All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => filterProducts("0-4000")}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
              >
                Below ₹4000
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => filterProducts("4000-8000")}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
              >
                ₹4000 - ₹8000
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleModal}
                className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full transition-colors w-full"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleModal}
        className={`fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors z-40 ${isModalOpen ? "hidden" : ""}`}
      >
        Open Filters
      </motion.button>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm rounded-xl border border-amber-400/20 mb-16 mt-24"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8 text-center"
        >
          Our Products
        </motion.h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white/50 via-yellow-100/30 to-yellow-200/40 backdrop-blur-md rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <div className="flex p-4">
                  <motion.img
                    src={product.images && product.images.length > 0 ? product.images[0] : defaultImage}
                    alt={`${product.title} - 1`}
                    className="w-full h-48 object-contain rounded-lg shadow-md"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {product.title}
                </h3>
                <p className="text-lg text-yellow-300 mb-4">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/singleProduct/${product.id}`}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full w-full transition-colors inline-block text-center"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <FAQ />
    </div>
  );
}

