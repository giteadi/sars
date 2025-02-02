import { motion } from "framer-motion"
import {
  AlertTriangle,
  Shield,
  FileWarning,
  Ruler,
  PenToolIcon as Tools,
  Wrench,
  CloudLightning,
  Scale,
  RefreshCw,
} from "lucide-react"

export default function Disclaimer() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const disclaimerPoints = [
    {
      icon: Shield,
      title: "Limitation of Liability",
      content:
        "We, Secure And Reliable Solution, shall not be liable for any damages or losses arising from the use of our WPC door and frame products, except to the extent caused by our negligence or breach of these terms.",
    },
    {
      icon: FileWarning,
      title: "No Warranty for Misuse",
      content: "We do not warrant our WPC door and frame products against misuse, neglect, or accident.",
    },
    {
      icon: RefreshCw,
      title: "Color Variation",
      content:
        "Due to the natural variation in wood fibers, the color of our WPC door and frame products may vary slightly from the samples or images shown.",
    },
    {
      icon: Ruler,
      title: "Dimensional Tolerance",
      content: "Our WPC door and frame products are subject to a dimensional tolerance of ±1/8 inch.",
    },
    {
      icon: Tools,
      title: "Installation",
      content:
        "We are not responsible for the installation of our WPC door and frame products. Installation must be done by a qualified professional.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      content:
        "Our WPC door and frame products require regular maintenance to ensure their longevity. Failure to maintain the products may void the warranty.",
    },
    {
      icon: CloudLightning,
      title: "Warranty Exclusions",
      content: [
        "Acts of God (e.g. floods, earthquakes)",
        "War, terrorism, or civil unrest",
        "Misuse or neglect",
        "Accident or damage caused by others",
        "Normal wear and tear",
      ],
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of M.P/INDIA.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={fadeIn}>
        <div className="text-center mb-12">
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Disclaimer</h1>
          <p className="text-gray-400">Last updated: January 26, 2024</p>
        </div>

        <div className="space-y-8">
          {disclaimerPoints.map((point, index) => (
            <DisclaimerSection key={index} icon={point.icon} title={point.title} content={point.content} />
          ))}

          {/* Changes to Terms */}
          <motion.div
            className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-400/20 rounded-full">
                <RefreshCw className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-400 mb-2">Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to change these terms at any time without notice.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            className="p-6 bg-amber-400/10 rounded-lg border border-amber-400/20 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-300 text-center">
              By purchasing our WPC door and frame products, you acknowledge that you have read, understood, and agreed
              to these terms.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const DisclaimerSection = ({ icon: Icon, title, content }) => (
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
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside space-y-2">
            {content.map((item, index) => (
              <li key={index} className="text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  </motion.div>
)

