'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../pages/Footer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, resetContactState } from '../Redux/ContactSlice';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  useEffect(() => {
    // Reset contact form state when component unmounts
    return () => {
      dispatch(resetContactState());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 text-center mb-12"
          >
            Get in Touch
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
              >
                <div className="p-3 bg-amber-400 rounded-full">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-400">8770229706</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
              >
                <div className="p-3 bg-amber-400 rounded-full">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-400">wpcind@sarsdecors.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
              >
                <div className="p-3 bg-amber-400 rounded-full">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-400">JABALPUR MADHYA PRADESH INDIA</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-amber-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </motion.button>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-green-500 text-white rounded-lg"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-red-500 text-white rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;

