import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  PhoneIcon as WhatsApp,
  Leaf,
  Recycle,
  TreePine,
  Wind,
  DoorOpenIcon as Door,
  TreesIcon as Plant,
  Sprout,
  Sun,
} from "lucide-react"
import eco2 from "../assets/eco2.jpg"
import FAQ from "../pages/FAQ"
import Carosal from "./Carosal"
import Reviews from "../pages/Reviews"
import Footer from "../pages/Footer"
import Navbar from "./NavBar"
import { useNavigate } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"

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

// New component for circular eco icons
const CircularEcoIcons = () => {
  const iconCount = 8
  const radius = 120 // Radius of the circle
  const centerX = 150 // Center X coordinate
  const centerY = 150 // Center Y coordinate

  const ecoIcons = [
    { Icon: Leaf, color: "text-green-400" },
    { Icon: Recycle, color: "text-green-500" },
    { Icon: TreePine, color: "text-green-600" },
    { Icon: Wind, color: "text-green-400" },
    { Icon: Plant, color: "text-green-500" },
    { Icon: Sprout, color: "text-green-600" },
    { Icon: Sun, color: "text-yellow-400" },
    { Icon: Leaf, color: "text-green-400" },
  ]

  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {ecoIcons.map((IconObj, index) => {
        const angle = (index / iconCount) * 2 * Math.PI
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        return (
          <motion.div
            key={index}
            className={`absolute ${IconObj.color}`}
            initial={{ scale: 0, x: centerX - 12, y: centerY - 12 }}
            animate={{
              scale: 1,
              x: x - 12,
              y: y - 12,
              rotate: 360,
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
          >
            <IconObj.Icon size={24} />
          </motion.div>
        )
      })}
      {/* Center door icon */}
      <motion.div
        className="absolute text-amber-400"
        style={{
          left: `${centerX - 24}px`,
          top: `${centerY - 24}px`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <Door size={48} />
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const nav = useNavigate()
  function clickhandle() {
    nav("/product")
  }
  return (
    <div className="w-full bg-black text-white">
      {/* Previous sections remain unchanged */}
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
              <h1 className="text-5xl md:text-5xl lg:text-5xl font-bold text-amber-400 leading-tight">
                Introducing SARS Premium Wpc Doors & Frame
              </h1>
              <p className="text-sm md:text-lg lg:text-lg text-white">
                the ultimate fusion of sustainbaility, durability and style of wpc door . experience the future of door
                advance manufacturing technology with our eco- friendly , low- maintenance and energy efficiency
                solution . design to enhance your home curb appeal and protect the enviromental
                <br />
                Creative and Unique
              </p>
              <p className="text-sm md:text-base lg:text-lg text-amber-400">DESIGN YOUR DREAM DOOR</p>
              <button
                className="bg-amber-400 text-black px-6 py-2 rounded-full hover:bg-amber-300 transition duration-300"
                onClick={clickhandle}
              >
                Explore Now
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation={fadeInRight}>
            <img
              src="https://res.cloudinary.com/bazeercloud/image/upload/v1737476007/SARS_1_Doors___1_-6__2_-removebg-preview_pbgmuw.png"
              alt="Featured Door"
              className="w-full scale-150 max-w-8xl mx-auto h-auto object-contain"
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
            {[
              "10 years assured warranty",
              "Water proof",
              "Durable and long-lasting",
              "Termite Resistance",
              "Low Maintenance",
              " Natural Wood Look",
              "Variety of Colors",
              "Customization Options",
              " Low Carbon Footprint",
              "High Strength",
              "Impact Resistance",
              "Thermal Insulation",
            ].map((feature, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <CircularEcoIcons />
              <img src={eco2 || "/placeholder.svg"} alt="Certification" className="object-contain mx-auto border rounded-full" />
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
      <a
        href="https://wa.me/918770229706"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  )
}

