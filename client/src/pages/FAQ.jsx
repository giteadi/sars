import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What is WPC?",
      answer: "WPC stands for Wood polymer Composite, a hybrid material made from recycle wood fibers and polymer.",
    },
    {
      id: 2,
      question: "What are the benefits of WPC doors and frames?",
      answer:
        "WPC doors and frames offer durability, low maintenance, resistance to warping, cracking, and rotting, and a natural wood look and feel.",
    },
    {
      id: 3,
      question: "Are WPC doors and frames waterproof?",
      answer:
        "Yes, WPC doors and frames are resistant to moisture and can withstand exposure to rain, snow, and humidity.",
    },
    {
      id: 4,
      question: "Do WPC doors and frames require maintenance?",
      answer: "No, WPC doors and frames require very little maintenance and can be easily cleaned with soap and water.",
    },
    {
      id: 5,
      question: "Can WPC doors and frames be customized?",
      answer:
        "Yes, WPC doors and frames can be molded into various shapes, sizes, and styles, and can also be finished with different colors and textures.",
    },
    {
      id: 6,
      question: "What is the warranty period for WPC doors and frames?",
      answer:
        "The warranty period for WPC doors and frames typically ranges from 10 to 25 years, depending on the manufacturer.",
    },
    {
      id: 7,
      question: "Are WPC doors and frames eco-friendly?",
      answer:
        "Yes, WPC doors and frames are made from recycled plastic and natural wood fibers, making them an eco-friendly option.",
    },
    {
      id: 8,
      question: "How do WPC doors and frames compare to traditional wood doors and frames?",
      answer:
        "WPC doors and frames offer higher durability, lower maintenance, and better insulation than traditional wood doors and frames.",
    },
    {
      id: 9,
      question: "Can WPC doors and frames be repaired?",
      answer:
        "Yes, WPC doors and frames can be repaired if damaged, but it's best to consult the manufacturer for specific guidance.",
    },
    {
      id: 10,
      question: "Where can I purchase WPC doors and frames?",
      answer:
        "WPC doors and frames can be purchased from authorized dealers, home improvement stores, and online retailers.",
    },
  ]
  const [openFaq, setOpenFaq] = useState(null)
  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <section className="container mx-auto px-4 py-16 w-full bg-black text-white">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-yellow-400/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg">
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-amber-400 text-lg"
              onClick={() => toggleFaq(faq.id)}
            >
              {faq.question}
              <ChevronDown className={`w-6 h-6 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
            </button>
            {openFaq === faq.id && <div className="px-6 py-4 text-gray-300">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

