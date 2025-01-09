import { Link } from "react-router-dom";
import { useState } from "react";
import FAQ from "./FAQ";
import Navbar from "../components/NavBar";

const ProductPage = () => {
  const allProducts = [
    {
      id: 1,
      title: "Ivry Door with Open",
      image:
        "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: 499.99,
    },
    {
      id: 2,
      title: "Grey Door Frame",
      image:
        "https://res.cloudinary.com/bazeercloud/image/upload/v1736018609/Grey_Door_frame-Photoroom_x5jzlx.png",
      price: 399.99,
    },
    {
      id: 3,
      title: "Ivry Door with Open",
      image:
        "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: 499.99,
    },
    {
      id: 4,
      title: "Grey Door Frame",
      image:
        "https://res.cloudinary.com/bazeercloud/image/upload/v1736018609/Grey_Door_frame-Photoroom_x5jzlx.png",
      price: 399.99,
    },
    {
      id: 5,
      title: "Ivry Door with Open",
      image:
        "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: 499.99,
    },
  ];

  const [products, setProducts] = useState(allProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterProducts = (priceRange) => {
    if (priceRange === "all") {
      setProducts(allProducts);
    } else {
      const [min, max] = priceRange.split("-").map(Number);
      const filtered = allProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
      setProducts(filtered);
    }
    setIsModalOpen(false); // Close modal after filtering
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-black text-white relative">
      <Navbar />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={toggleModal}
        >
          <div
            className="bg-white text-black rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <h2 className="text-xl font-bold mb-4">Filter Products</h2>
            <button
              onClick={() => filterProducts("all")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
            >
              All
            </button>
            <button
              onClick={() => filterProducts("0-400")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
            >
              Below $400
            </button>
            <button
              onClick={() => filterProducts("400-500")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors mb-2 w-full"
            >
              $400 - $500
            </button>
            <button
              onClick={toggleModal}
              className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-full transition-colors w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Filter Button */}
      <button
        onClick={toggleModal}
        className={`fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full transition-colors z-40 ${
          isModalOpen ? "hidden" : ""
        }`}
      >
        Open Filters
      </button>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm rounded-xl border border-amber-400/20 mb-16 mt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-white/50 via-yellow-100/30 to-yellow-200/40 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {product.title}
                </h3>
                <p className="text-lg text-yellow-300 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  to={`/singleProduct`}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full w-full transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default ProductPage;
