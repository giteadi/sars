import { useEffect, useCallback } from "react";
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

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount, loading, error } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.property);
  const user = useSelector((state) => state.auth.user);

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
    const product = products.find((p) => p.id === item.product_id || p.title === item.title);
    return {
      ...item,
      images: product?.images || [],
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

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate('/login');
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Format cart items to match backend expectation
      const items = cartItems.map(item => ({
        quantity: Number(item.quantity),
        price: Number(item.price)
      }));

      const orderData = {
        amount: Math.round(totalAmount), // Ensure whole number
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        user_id: user.user_id,
        items: items // Changed from product_ids and quantities to items array
      };

      console.log("Sending order data:", orderData);

      const orderResult = await dispatch(createRazorpayOrder(orderData)).unwrap();
    
      if (!orderResult?.order?.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: "rzp_test_suGlReUubwbXnb",
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "Cart Checkout",
        description: `Payment for ${items.length} items`,
        order_id: orderResult.order.id,
        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.user_id,
              items: items // Include items in payment validation
            };

            const validation = await dispatch(validatePayment(paymentData)).unwrap();
            if (validation.msg) {
              await dispatch(clearUserCart(user.user_id));
              toast.success('Payment successful! Your order has been placed.');
              navigate('/orders');
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
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message || error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <header className="p-4 border-b border-yellow-500/20">
        <div className="text-yellow-500 font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          CART
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-4">
        {mergedCartItems.length === 0 ? (
          <div className="text-center text-xl font-semibold">Your cart is empty</div>
        ) : (
          <div className="space-y-6">
            {mergedCartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.images.length > 0
                        ? item.images[0]
                        : "https://res.cloudinary.com/bazeercloud/image/upload/v1736018602/Ivry_Door_with_open-Photoroom_de4e98.png"
                    }
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "decrease")}
                    className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "increase")}
                    className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {mergedCartItems.length > 0 && (
          <>
            <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <span className="text-xl font-semibold">Total:</span>
                <span className="ml-2 text-sm text-gray-400">
                  ({mergedCartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
              </div>
              <span className="text-2xl font-bold text-yellow-500">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button 
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors flex items-center gap-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
