import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, UserCheck, Bell, Scale } from 'lucide-react'

export default function PrivacyPolicy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

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

        <div className="space-y-8">
          <Section
            icon={Eye}
            title="Information We Collect"
            content="We collect information that you provide directly to us, including but not limited to your name, email address, phone number, and delivery address when you place an order or create an account. We also automatically collect certain information about your device when you use our website."
          />

          <Section
            icon={Shield}
            title="How We Use Your Information"
            content="We use the information we collect to process your orders, communicate with you about our products and services, improve our website functionality, and send you marketing communications (with your consent)."
          />

          <Section
            icon={UserCheck}
            title="Information Sharing"
            content="We do not sell or rent your personal information to third parties. We may share your information with our service providers who assist us in operating our website, conducting our business, or serving our users."
          />

          <Section
            icon={Bell}
            title="Communications"
            content="You may opt-out of receiving marketing communications from us by following the unsubscribe instructions included in our emails or contacting us directly."
          />

          <Section
            icon={FileText}
            title="Data Security"
            content="We implement appropriate technical and organizational measures to maintain the security of your personal information, but please note that no method of transmission over the Internet is 100% secure."
          />

          <Section
            icon={Scale}
            title="Your Rights"
            content="You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. To exercise these rights, please contact us."
          />

          <div className="mt-12 p-6 bg-amber-400/10 rounded-lg border border-amber-400/20">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>Email: privacy@sarsdoors.com</li>
              <li>Phone: +91 8770229706</li>
              <li>Address: SARS WPC Doors, Industrial Area, Indore, India</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Section = ({ icon: Icon, title, content }) => (
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
        <h2 className="text-xl font-semibold text-amber-400 mb-2">{title}</h2>
        <p className="text-gray-300 leading-relaxed">{content}</p>
      </div>
    </div>
  </motion.div>
)
