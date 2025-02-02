import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, UserCheck, Bell, Scale, Mail, Phone, MapPin } from 'lucide-react'

export default function PrivacyPolicy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const sections = [
    {
      icon: Eye,
      title: "What Personal Information Do We Collect?",
      content: [
        "Visit our website and fill out a contact form or request a quote",
        "Purchase our WPC door and frame products",
        "Interact with us on social media or through email",
        "Provide feedback or reviews about our products or services",
        "Your name and contact information (address, phone number, email)",
        "Your payment information (credit card number, expiration date)",
        "Your purchase history and product preferences",
        "Your feedback and reviews about our products or services"
      ]
    },
    {
      icon: Shield,
      title: "How Do We Use Your Personal Information?",
      content: [
        "Process your purchases and provide you with our products",
        "Respond to your inquiries and provide customer support",
        "Improve our products and services based on your feedback",
        "Send you marketing communications and promotions",
        "Comply with applicable laws and regulations"
      ]
    },
    {
      icon: UserCheck,
      title: "How Do We Protect Your Personal Information?",
      content: [
        "Encrypting your personal information when it is transmitted to us",
        "Storing your personal information on secure servers",
        "Limiting access to your personal information to authorized personnel",
        "Implementing physical, electronic, and procedural safeguards"
      ]
    },
    {
      icon: Bell,
      title: "Sharing Your Personal Information",
      content: [
        "Our affiliates and subsidiaries",
        "Our service providers and contractors",
        "Our payment processors and financial institutions",
        "Law enforcement agencies and regulatory authorities"
      ]
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: [
        "Access and correct your personal information",
        "Request deletion of your personal information",
        "Opt out of marketing communications",
        "File a complaint with a regulatory authority"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="text-center mb-12">
          <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: January 26, 2024</p>
        </div>

        {/* Introduction */}
        <motion.div
          className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-300 leading-relaxed">
            At Secure And Reliable Solution, we are committed to protecting the privacy and security of our customers' personal information. 
            This privacy policy explains how we collect, use, and protect your personal information when you visit our website, 
            purchase our products, or interact with us in any other way.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Section
              key={index}
              icon={section.icon}
              title={section.title}
              items={section.content}
            />
          ))}

          {/* Changes to Privacy Policy */}
          <motion.div
            className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-400/20 rounded-full">
                <Scale className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-400 mb-2">Changes to This Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify this privacy policy at any time. If we make any material changes to this policy, 
                  we will notify you by email or through a notice on our website.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-amber-400" />
                <span>Email: wpcind@sarsdecors.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Phone: +91 8770229706</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Address: SARS WPC Doors, Jabalpur, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const Section = ({ icon: Icon, title, items }) => (
  <motion.div
    className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start gap-4">
      <div className="p-2 bg-amber-400/20 rounded-full">
        <Icon className="w-6 h-6 text-amber-400" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-amber-400 mb-4">{title}</h2>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <span className="text-amber-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
)
