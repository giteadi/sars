"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../Redux/propertySlice";
import Spinner from "../../components/Spinner";
import Dashboard from './Dashboard'
export default function AdminProductPage() {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector((state) => state.property);

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    dimension: "",
    services: "",
    imageFiles: [],
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, success]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, imageFiles: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, ...productData }));
    } else {
      dispatch(createProduct(productData));
    }
    setProductData({
      title: "",
      description: "",
      price: "",
      dimension: "",
      services: "",
      imageFiles: [],
    });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductData({
      title: product.title,
      description: product.description,
      price: product.price,
      dimension: product.dimension,
      services: product.services,
      imageFiles: [],
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#29004e] to-[#3e32c6] text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-6">Admin Product Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-2xl mb-8 shadow-lg border border-white/20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={productData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="dimension"
            placeholder="Dimension"
            value={productData.dimension}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="services"
            placeholder="Services"
            value={productData.services}
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
          {editingProduct ? "Update Product" : "Create Product"}
        </button>
      </form>

      <div className="w-full max-w-5xl">
        {products.length === 0 ? (
          <p className="text-center text-xl">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-white/20"
              >
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-white/20"
                />
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-white/70">{product.description}</p>
                <p className="text-green-400 font-bold text-lg mt-2">₹{product.price}</p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-400 transition-all text-black py-2 px-4 rounded-lg font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
