import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carosal() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = [
        { id: 1, name: 'Wood Door', image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Brown_Door_Frame_2-Photoroom_avffyz.png' },
        { id: 2, name: 'Wood Door', image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Brown_Door_Frame_2-Photoroom_avffyz.png' },
        { id: 3, name: 'Wood Door', image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Brown_Door_Frame_2-Photoroom_avffyz.png' },
        { id: 4, name: 'Frame', image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736018609/Grey_Door_frame-Photoroom_x5jzlx.png' },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="bg-yellow-400/10 backdrop-blur-md border border-white/30 p-12 rounded-3xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-4 relative">
                    Our Products
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-30 blur-xl z-[-1]"></span>
                </h2>
                <div className="relative">
                    <div className="flex overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {products.map((product) => (
                                <div key={product.id} className="w-1/3 flex-shrink-0 px-12"> {/* Increased px-8 to px-12 */}
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full max-w-[200px] h-[400px] object-contain"
                                        />
                                        <p className="mt-4 text-lg text-amber-400">{product.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
                    >
                        <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-400 p-2 rounded-full"
                    >
                        <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                </div>
            </div>
        </section>
    );
}
