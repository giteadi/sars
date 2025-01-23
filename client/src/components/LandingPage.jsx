import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ChevronDown, Facebook, Twitter, Instagram } from "lucide-react"
import FAQ from "../pages/FAQ"
import Carosal from "./Carosal"
import Reviews from "../pages/Reviews"
import Footer from "../pages/Footer"
import Navbar from "./NavBar"
import { useNavigate } from "react-router-dom"
// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Component to handle scroll animations
const AnimatedSection = ({ children, animation }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={animation}>
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
const nav=useNavigate();
function clickhandle(){
  nav('/product');
}
  return (
    <div className="w-full bg-black text-white">
      <Navbar />
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
        <div className="absolute inset-0 bg-yellow-200/10 z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <AnimatedSection animation={fadeInLeft}>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-400 leading-tight">Introducing SARS Premium Wpc Doors & Frame</h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-amber-400">
              the ultimate fusion of sustainbaility, durability and style of wpc door
                <br />
                Creative and Unique
              </p>
              <p className="text-sm md:text-base lg:text-lg text-amber-400">DESIGN YOUR DREAM DOOR</p>
              <button className="bg-amber-400 text-black px-6 py-2 rounded-full hover:bg-amber-300 transition duration-300"
              onClick={clickhandle}>
                Explore Now
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation={fadeInRight}>
            <img
              src="https://res.cloudinary.com/bazeercloud/image/upload/v1737476007/SARS_1_Doors___1_-6__2_-removebg-preview_pbgmuw.png"
              alt="Featured Door"
              className="w-full max-w-6xl mx-auto h-auto object-contain"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Product Section */}
      <AnimatedSection animation={fadeInUp}>
        <Carosal />
      </AnimatedSection>

      {/* Product Features */}
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection animation={fadeInLeft}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm border border-amber-400/20">
            {["10 years assured warranty", "Water proof", "Durable and long-lasting","Termite Resistance","Low Maintenance"," Natural Wood Look","Variety of Colors","Customization Options"," Low Carbon Footprint","High Strength","Impact Resistance","Thermal Insulation"].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-4">
                <span className="text-amber-400 text-xl">✓</span>
                <p className="text-amber-400 text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Reviews */}
      {/* <AnimatedSection animation={fadeInRight}>
        <Reviews />
      </AnimatedSection> */}
    <p className="flex items-center justify-center text-3xl font-bold text-gray-400 mt-4">ECO FRIENDLY</p>
      {/* Eco Friendly */}
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection animation={fadeInUp}>
          <div className="bg-yellow-400/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
          {/* <p className="flex items-center justify-center text-xl text-gray-400 mt-4">ECO FRIENDLY</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
              <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1736019937/rb_222_hokupo.png"
                alt="Eco Friendly"
                className="w-32 h-32 object-contain mx-auto"
              />
              <img
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1736020045/rb_114044_u30hxx.png"
                alt="Certification"
                className="w-32 h-32 object-contain mx-auto"
              />
            </div>
            
          </div>
        </AnimatedSection>
      </section>

      {/* FAQs */}
      <AnimatedSection animation={fadeInLeft}>
        <FAQ />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  )
}

