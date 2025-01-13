import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/propertySlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.property);

  const [currentSlide, setCurrentSlide] = useState(1); // Start from the first actual product
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Extended products with clones
  const extendedProducts =
    products.length > 0
      ? [products[products.length - 1], ...products, products[0]]
      : [];

  const handleNext = () => {
    if (isAnimating) return; // Prevent double trigger if animating
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating) return; // Prevent double trigger if animating
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Handle transition end to reset position for infinite loop
  const handleTransitionEnd = () => {
    setIsAnimating(false);

    // Ensure we loop back to the correct product when at the edges
    if (currentSlide === 0) {
      setCurrentSlide(products.length);
    } else if (currentSlide === extendedProducts.length - 1) {
      setCurrentSlide(1);
    }
  };

  // Automatic sliding every 3 seconds
  useEffect(() => {
    if (!isAnimating) {
      const interval = setInterval(handleNext, 3000); // Trigger the next slide every 3 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [currentSlide, isAnimating]); // Depend on `currentSlide` and `isAnimating`

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-yellow-400/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-4">
          Our Products
        </h2>
        <div className="relative overflow-hidden">
          <div
            className="carousel-inner flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedProducts.map((product, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 px-12"
                style={{ flex: "0 0 100%" }} // Full width for each slide
              >
                <div className="flex flex-col items-center">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://via.placeholder.com/600x800?text=No+Image"
                    }
                    alt={product.title}
                    className="w-full max-w-[350px] h-[500px] object-contain"
                  />
                  <p className="mt-4 text-lg text-amber-400">{product.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
