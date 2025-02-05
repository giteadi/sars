"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, getAllBlogs, updateBlog, deleteBlog } from "../../Redux/BlogSlice"; // Import blog actions
import Spinner from "../../components/Spinner"; // Assuming you have a Spinner component

export default function AdminBlogPage() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    imageFiles: [],
  });

  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    dispatch(getAllBlogs()); // Fetch blogs on page load
  }, [dispatch]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBlogData({ ...blogData, imageFiles: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBlog) {
      dispatch(updateBlog({ id: editingBlog.id, ...blogData }));
    } else {
      dispatch(addBlog(blogData));
    }
    setBlogData({ title: "", content: "", imageFiles: [] });
    setEditingBlog(null);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setBlogData({
      title: blog.title,
      content: blog.content,
      imageFiles: [],
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#29004e] to-[#3e32c6] text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-6">Admin Blog Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-2xl mb-8 shadow-lg border border-white/20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {editingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={blogData.content}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 text-white bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all text-white py-3 px-6 rounded-lg font-bold shadow-lg"
        >
          {editingBlog ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <div className="w-full max-w-5xl">
        {blogs.length === 0 ? (
          <p className="text-center text-xl">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-white/20"
              >
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-white/70">{blog.content}</p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 hover:bg-yellow-400 transition-all text-black py-2 px-4 rounded-lg font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 hover:bg-red-400 transition-all text-white py-2 px-4 rounded-lg font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
