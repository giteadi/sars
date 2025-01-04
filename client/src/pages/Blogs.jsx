import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import FAQ from '../pages/FAQ';
import Footer from '../pages/Footer';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Create a Beautiful Door Design',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736020955/dummy_image_1.png',
      date: 'January 4, 2025',
      excerpt: 'Learn how to design beautiful doors with modern styles and eco-friendly materials...',
    },
    {
      id: 2,
      title: 'Top 5 Door Trends for 2025',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736020955/dummy_image_2.png',
      date: 'January 3, 2025',
      excerpt: 'Discover the top trends in door design for 2025, from minimalist designs to smart doors...',
    },
    {
      id: 3,
      title: 'Sustainable Materials for Home Doors',
      image: 'https://res.cloudinary.com/bazeercloud/image/upload/v1736020955/dummy_image_3.png',
      date: 'January 2, 2025',
      excerpt: 'Explore sustainable materials for making eco-friendly home doors that are stylish and durable...',
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      <Navbar />
      
      {/* Blog Section */}
      <section className="container mx-auto px-4 py-16 mt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8 text-center">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-br from-white/30 via-yellow-200/40 to-yellow-300/50 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{post.date}</p>
                <p className="text-lg text-yellow-400 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-full w-full transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;
