import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import Navbar from '../components/NavBar';

const ProductPage = () => {
  const products = [
    {
      id: 1,
      title: "Ivry Door with Open",
      image: "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: "$499.99",
    },
    {
      id: 2,
      title: "Grey Door Frame",
      image: "https://res.cloudinary.com/bazeercloud/image/upload/v1736018609/Grey_Door_frame-Photoroom_x5jzlx.png",
      price: "$399.99",
    },
    {
      id: 3,
      title: "Ivry Door with Open",
      image: "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: "$499.99",
    },
    {
      id: 4,
      title: "Grey Door Frame",
      image: "https://res.cloudinary.com/bazeercloud/image/upload/v1736018609/Grey_Door_frame-Photoroom_x5jzlx.png",
      price: "$399.99",
    },
    {
      id: 5,
      title: "Ivry Door with Open",
      image: "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png",
      price: "$499.99",
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      <Navbar />
      
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
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {product.title}
                </h3>
                <p className="text-lg text-yellow-300 mb-4">{product.price}</p>
                <Link
                  to={`/product/${product.id}`}
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
