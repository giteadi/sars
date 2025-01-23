"use client";

import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import Footer from "../pages/Footer";
import { Award, Users, Shield, Target } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Years of Experience", value: "5+" },
    { label: "Products Delivered", value: "1000+" },
    { label: "Happy Customers", value: "500+" },
    { label: "Team Members", value: "50+" },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality",
      description:
        "We never compromise on quality and always deliver the best products.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation",
      description:
        "We constantly innovate to bring you the latest in door technology.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our business.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 mb-6"
          >
            About SARS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300"
          >
            We are committed to creating beautiful, durable, and innovative door
            solutions that enhance both the beauty and security of your home.
          </motion.p>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg text-center"
            >
              <h3 className="text-3xl font-bold text-amber-400 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Welcome to Secure And Reliable Solutions (SARS), a leading
                manufacturer of high-quality Wood Polymer Composite (WPC)
                products. Our company was founded on the principles of
                innovation, sustainability, and customer satisfaction.
              </p>
              <p>
                <strong>Our Mission:</strong> At SARS, we are dedicated to
                providing our customers with the best WPC products available on
                the market. We are committed to continuous innovation, using the
                latest technology and manufacturing techniques.
              </p>
              <p>
                <strong>Our Vision:</strong> Our vision is to become the global
                leader in WPC manufacturing, renowned for our exceptional
                quality, customer service, and commitment to sustainability.
              </p>
              <p>
                <strong>Our Values:</strong>
                <ul className="list-disc pl-5">
                  <li><strong>Innovation:</strong> We continuously innovate to meet the evolving needs of our customers.</li>
                  <li><strong>Sustainability:</strong> We strive to minimize our environmental impact and encourage sustainable practices.</li>
                  <li><strong>Customer Satisfaction:</strong> We prioritize delivering exceptional service and ensuring our customers' happiness.</li>
                </ul>
              </p>
              <p>
                <strong>Our Team:</strong> Our team consists of highly skilled professionals passionate about WPC. Our research and development team is constantly working to improve and expand our product offerings.
              </p>
              <p>
                <strong>Contact Us:</strong> If you have any questions or would like to learn more about our products, feel free to contact us. We’re always happy to assist.
              </p>
              <p>
                We take immense pride in our craftsmanship, ensuring every product we create meets the highest standards of quality and durability.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <img
              src="https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png"
              alt="Our Workshop"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-lg text-center"
              >
                <div className="w-12 h-12 bg-amber-400 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
