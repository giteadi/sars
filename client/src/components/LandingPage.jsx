import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Leaf,
  Recycle,
  TreePine,
  Wind,
  DoorOpenIcon as Door,
  TreesIcon as Plant,
  Sprout,
  Sun,
  Medal,
  Wallet,
  Shield,
  Clock,
  PaintBucket,
  Sparkles,
  Ruler,
  ThumbsUp,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react"
import eco2 from "../assets/eco2.jpg"
import FAQ from "../pages/FAQ"
import Carosal from "./Carosal"
import Footer from "../pages/Footer"
import Navbar from "./NavBar"
import { useNavigate } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import TopBar from "./TopBar"

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

// Component for circular eco icons
const CircularEcoIcons = () => {
  const iconCount = 8
  const radius = 120
  const centerX = 150
  const centerY = 150

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
    <div className="relative w-[300px] h-[300px] mx-auto ">
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
    
    <div className="mt-2 p-2 md:mt-5 md:p-4">
    <TopBar/>
    </div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-yellow-200/10 z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <AnimatedSection animation={fadeInLeft}>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-amber-400 leading-tight">
                DESIGN YOUR DREAM DOOR
              </h1>
              <p className="text-sm md:text-lg lg:text-lg text-white">
                The ultimate fusion of sustainbaility, durability and style of wpc door . Experience the future of door
                advance manufacturing technology with our eco- friendly , low- maintenance and energy efficiency
                solution . Design to enhance your home curb appeal and protect the Enviromental
                <br />
                Creative and Unique
              </p>

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
              className="w-full max-w-2xl mx-auto h-auto object-contain scale-110"
              style={{ transformOrigin: "center" }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Product Section */}
      <AnimatedSection animation={fadeInUp}>
        <Carosal />
      </AnimatedSection>

      {/* Product Features */}
      {/* <section className="container mx-auto px-4 py-16">
        <AnimatedSection animation={fadeInLeft}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm border border-amber-400/20">
            {[
              "10 years assured warranty",
              "Water proof",
              "Durable and long-lasting",
              "Termite Resistance",
              "Low Maintenance",
              "Natural Wood Look",
              "Variety of Colors",
              "Customization Options",
              "Low Carbon Footprint",
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
      </section> */}

      {/* USP Section */}
      <section className="container mx-auto px-4 py-16">
        <AnimatedSection animation={fadeInLeft}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Why Choose SARS WPC Doors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm border border-amber-400/20">
            {[
              {
                icon: Medal,
                title: "Premium Quality",
                description: "Superior grade materials ensuring lasting durability",
              },
              {
                icon: Shield,
                title: "10 Year Warranty",
                description: "Comprehensive warranty coverage for peace of mind",
              },
              {
                icon: TreePine,
                title: "Eco-Friendly",
                description: "Sustainable materials with minimal environmental impact",
              },
              {
                icon: Wallet,
                title: "Cost-Effective",
                description: "Excellent value for money with long-term savings",
              },
              {
                icon: Clock,
                title: "Low Maintenance",
                description: "Minimal upkeep required, saving time and effort",
              },
              {
                icon: PaintBucket,
                title: "Wide Color Range",
                description: "Extensive selection of colors to match your style",
              },
              {
                icon: Sparkles,
                title: "UV Resistant",
                description: "Protected against sun damage and discoloration",
              },
              {
                icon: Ruler,
                title: "Custom Sizes",
                description: "Tailored dimensions to fit your specific needs",
              },
              {
                icon: ThumbsUp,
                title: "Easy Installation",
                description: "Simplified fitting process with professional support",
              },
              {
                icon: Leaf,
                title: "Weather Resistant",
                description: "Excellent performance in all weather conditions",
              },
              {
                icon: HeartHandshake,
                title: "Expert Support",
                description: "Dedicated customer service and technical assistance",
              },
              {
                icon: BadgeCheck,
                title: "Certified Quality",
                description: "Meeting international quality standards",
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-amber-400/10 transition-colors duration-300"
              >
                <div className="mb-4 p-3 rounded-full bg-amber-400/20">
                  <usp.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">{usp.title}</h3>
                <p className="text-sm text-gray-300">{usp.description}</p>
              </motion.div>
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
              <img src={eco2 || "/placeholder.svg"} alt="Certification" className="object-contain mx-auto" />
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
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center w-12 h-12"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  )
}

