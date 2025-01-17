'use client'

import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../pages/Footer';
import { Calendar, Clock, User, Share2 } from 'lucide-react';

const SingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Simulated blog data - replace with your actual data fetching
    const blogData = {
      title: 'How to Create a Beautiful Door Design',
      date: 'January 15, 2024',
      readTime: '5 min read',
      author: 'John Doe',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png',
      content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      `
    };
    setBlog(blogData);
  }, [id]);

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
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 rounded-2xl overflow-hidden"
          >
            <img
              src={blog.image || "/placeholder.svg"}
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
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
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
