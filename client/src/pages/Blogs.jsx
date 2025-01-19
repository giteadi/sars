import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../Redux/BlogSlice";
import Navbar from "../components/NavBar";
import FAQ from "../pages/FAQ";
import Footer from "../pages/Footer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error}</div>;
  }

  return (
    <div className="w-full bg-black text-white">
      <Navbar />

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-16 mt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8 text-center">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-br from-white/30 via-yellow-200/40 to-yellow-300/50 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="relative w-full h-64">
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  {formatDate(post.created_at)}
                </p>
                <p className="text-lg text-yellow-400 mb-4">
                  {post.description}
                </p>
                <Link
                  to={`/singleblog/${post.id}`}
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
