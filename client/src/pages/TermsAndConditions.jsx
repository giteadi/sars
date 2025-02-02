import { motion } from "framer-motion"
import { Scale } from "lucide-react"

export default function TermsAndConditions() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const sections = [
    {
      title: "General Terms",
      items: [
        'Definitions: In these Terms and Conditions, "WPC" refers to Wood Plastic Composite, "Product" refers to any WPC product, and "Customer" refers to the person or organization purchasing the Product.',
        "Acceptance: By purchasing the Product, the Customer acknowledges that they have read, understood, and accepted these Terms and Conditions.",
        "Governing Law: These Terms and Conditions shall be governed by and construed in accordance with the laws of INDIA/MADHAY PARDESH.",
      ],
    },
    {
      title: "Product Warranty",
      items: [
        "Warranty Period: The Product is warranted to be free from defects in material and workmanship for a period of TEN(10) years from the date of purchase.",
        "Warranty Coverage: The warranty covers defects in the Product that occur during normal use and does not cover damage caused by misuse, neglect, or accident.",
        "Warranty Claim: To make a warranty claim, the Customer must notify the manufacturer in writing within the same days of discovering the defect.",
      ],
    },
    {
      title: "Payment Terms",
      items: [
        "Payment Method: Payment for the Product shall be made by Debit card, bank transfer, RTGS, NEFT, Online Pay.",
        "Payment Terms: Payment is due upon receipt of the Product.",
        "Late Payment: If payment is not made within the same days of the due date, the manufacturer reserves the right to charge interest on the outstanding amount.",
      ],
    },
    {
      title: "Delivery and Installation",
      items: [
        "Delivery: The Product shall be delivered to the Customer within the same days of receipt of payment.",
        "Installation: The Customer is responsible for installing the Product, unless otherwise agreed in writing.",
        "Installation Warranty: If the manufacturer installs the Product, it warrants that the installation will be done in a workmanlike manner.",
      ],
    },
    {
      title: "Cancellation and Returns",
      items: [
        "Cancellation: The Customer may cancel their order within 7 days of receipt of the Product.",
        "Returns: The Customer may return the Product within 7 days of receipt, provided it is in its original condition and packaging.",
        "Refund: The manufacturer shall refund the Customer's payment in full, minus any shipping and handling charges.",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={fadeIn}>
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Terms and Conditions</h1>
          <p className="text-gray-400">Last updated: January 26, 2024</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-4">{section.title}</h2>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className="mt-12 p-6 bg-amber-400/10 rounded-lg border border-amber-400/20">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-4">Questions about the Terms and Conditions should be sent to us at:</p>
            <ul className="space-y-2 text-gray-300">
              <li>Email: wpcind@sarsdecors.com</li>
              <li>Phone: +91 8770229706</li>
              <li>Address: SARS WPC Doors, Jabalpur, India</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

