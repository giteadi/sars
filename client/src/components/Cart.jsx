'use client'

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
} from "../Redux/CartSlice";
import { fetchProducts } from "../Redux/propertySlice";
import { createRazorpayOrder, validatePayment } from '../Redux/PaymentSlice';
import { ShoppingCart, Trash, ChevronRight, Plus, Minus } from 'lucide-react';
import Footer from "../pages/Footer";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3
    }
  }
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.property);
  const user = useSelector((state) => state.auth.user);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchCartItems(user.user_id));
    }
    dispatch(fetchProducts());
  }, [dispatch, user]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);

  const mergedCartItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id || p.title === item.title);
    const productId = products.find((p) => p.id === item.id || p.title === item.title);
    return {
      ...item,
      images: product?.images || [],
      product_id: productId?.id
    };
  });

  const handleUpdateQuantity = useCallback(
    (cartId, action) => {
      const currentItem = cartItems.find((item) => item.id === cartId);
      if (currentItem) {
        const newQuantity = action === "increase" ? currentItem.quantity + 1 : currentItem.quantity - 1;
        if (newQuantity > 0) {
          dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }));
        } else if (newQuantity === 0) {
          dispatch(removeCartItem(cartId));
        }
      }
    },
    [cartItems, dispatch]
  );

  const handleRemoveItem = useCallback(
    (cartId) => {
      dispatch(removeCartItem(cartId));
    },
    [dispatch]
  );

  const handleClearCart = () => {
    if (user?.user_id) {
      dispatch(clearUserCart(user.user_id));
    }
  };

  const totalAmount = mergedCartItems.reduce((total, item) => 
    total + (Number(item.price) * Number(item.quantity)), 0);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate('/login');
      return;
    }

    if (!mergedCartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const validItems = mergedCartItems.filter(item => 
        item.product_id && 
        item.quantity && 
        !isNaN(item.price) && 
        item.price > 0
      );

      if (validItems.length === 0) {
        toast.error('No valid items found in cart');
        return;
      }

      const orderData = {
        amount: Math.round(totalAmount),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        user_id: user.user_id,
        product_ids: validItems.map(item => item.product_id.toString()),
        quantities: validItems.map(item => Number(item.quantity))
      };

      const orderResult = await dispatch(createRazorpayOrder(orderData)).unwrap();

      if (!orderResult?.order?.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: "rzp_test_suGlReUubwbXnb",
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "Cart Checkout",
        description: `Payment for ${validItems.length} items`,
        order_id: orderResult.order.id,
        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.user_id,
              product_ids: validItems.map(item => item.product_id.toString()),
              amount: orderResult.order.amount 
            };

            const validation = await dispatch(validatePayment(paymentData)).unwrap();
            if (validation.msg) {
              await dispatch(clearUserCart(user.user_id));
              toast.success('Payment successful! Your order has been placed.');
            }
          } catch (err) {
            console.error('Payment verification failed:', err);
            toast.error(err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || ""
        },
        theme: {
          color: "#EAB308"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message || 'Failed to initiate payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center py-8 text-red-500"
      >
        Error: {error.message || error}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 border-b border-yellow-500/20 flex justify-between items-center"
      >
        <div className="text-yellow-500 font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          CART
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to='/' className="text-yellow-500 font-bold flex items-center gap-2">
            Home
          </Link>
        </motion.div>
      </motion.header>

      <main className="flex-grow max-w-6xl mx-auto p-4 w-full">
        {mergedCartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/product" 
                className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <AnimatePresence>
              {mergedCartItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 p-4 rounded-lg gap-4"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={item.images.length > 0 ? item.images[0] : "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-yellow-500">₹{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, "decrease")}
                        className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, "increase")}
                        className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash className="w-5 h-5" />
                    </motion.button>
                    <span className="font-semibold min-w-[80px] text-right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 p-4 rounded-lg gap-4"
            >
              <div>
                <span className="text-xl font-semibold">Total:</span>
                <span className="ml-2 text-sm text-gray-400">
                  ({mergedCartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
              </div>
              <span className="text-2xl font-bold text-yellow-500">₹{totalAmount.toFixed(2)}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-col sm:flex-row justify-between gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleClearCart}
                disabled={isProcessing}
              >
                Clear Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
