import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react'

  export default function FAQ() {
    const faqs = [
        { id: 1, question: 'Frequently Asked Question 1', answer: 'Answer to question 1' },
        { id: 2, question: 'Frequently Asked Question 2', answer: 'Answer to question 2' },
        { id: 3, question: 'Frequently Asked Question 3', answer: 'Answer to question 3' },
      ]
      const [openFaq, setOpenFaq] = useState(null)
      const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id)
      }
    return(
        <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-amber-400 text-lg"
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    openFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === faq.id && (
                <div className="px-6 py-4 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    )
  }