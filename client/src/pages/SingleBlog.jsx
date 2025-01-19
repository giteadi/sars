import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogById } from '../Redux/BlogSlice';
import Navbar from '../components/NavBar';
import Footer from '../pages/Footer';
import { Calendar, Clock, User, Share2 } from 'lucide-react';

const SingleBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error}</div>;
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 mb-6"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Admin</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 rounded-2xl overflow-hidden"
          >
            <img
              src={blog.image_url || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="mb-6 leading-relaxed">{blog.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-8 border-t border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Share this article</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-amber-400 rounded-full text-black"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
};

export default SingleBlogPage;

