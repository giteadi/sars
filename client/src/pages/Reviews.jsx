import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Reviews() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="container mx-auto px-4 py-16" ref={ref}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-xl bg-gradient-to-br from-amber-400/10 to-transparent backdrop-blur-sm border border-amber-400/20">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`aspect-square rounded-2xl flex items-center justify-center ${
              index % 2 === 0
                ? 'bg-gray-800/50 backdrop-blur-sm'
                : 'bg-amber-400'
            }`}
          >
            <span className="text-3xl">★★★★★</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

