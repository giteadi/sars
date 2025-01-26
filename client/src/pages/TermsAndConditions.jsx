import { motion } from "framer-motion"
import { Scale, FileCheck, ShieldCheck, Truck, RefreshCcw, Ban, HelpCircle } from "lucide-react"

export default function TermsAndConditions() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={fadeIn}>
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Terms and Conditions</h1>
          <p className="text-gray-400">Last updated: January 26, 2024</p>
        </div>

        <div className="space-y-8">
          <Section
            icon={FileCheck}
            title="Acceptance of Terms"
            content="By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services."
          />

          <Section
            icon={ShieldCheck}
            title="Product Information"
            content="We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by SARS WPC Doors is not as described, your sole remedy is to return it in unused condition."
          />

          <Section
            icon={Truck}
            title="Shipping & Delivery"
            content="Delivery times are estimates only. SARS WPC Doors is not liable for any delays in delivery. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments."
          />

          <Section
            icon={RefreshCcw}
            title="Returns & Refunds"
            content="Products can be returned within 7 days of delivery if they are in original condition. Custom-made products cannot be returned unless they are defective. Refunds will be processed within 14 business days of receiving the returned product."
          />

          <Section
            icon={Ban}
            title="Limitations of Liability"
            content="SARS WPC Doors shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the products."
          />

          <Section
            icon={HelpCircle}
            title="Dispute Resolution"
            content="Any dispute arising from or relating to these terms and conditions will be resolved through arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996. The venue for arbitration shall be Indore, India."
          />

          <div className="mt-12 p-6 bg-amber-400/10 rounded-lg border border-amber-400/20">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-4">Questions about the Terms and Conditions should be sent to us at:</p>
            <ul className="space-y-2 text-gray-300">
              <li>Email: wpcind@sarsdecors.com</li>
              <li>Phone: +91 8770229706</li>
              <li>Address: SARS WPC Doors, Jabalpur, India</li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-amber-400/5 rounded-lg border border-amber-400/10">
            <p className="text-sm text-gray-400 text-center">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound
              by these Terms and Conditions.
            </p>
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

