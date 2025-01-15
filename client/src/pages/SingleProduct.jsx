import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Star, Info, Ruler, PenTool } from 'lucide-react';
import { createRazorpayOrder, validatePayment } from '../Redux/PaymentSlice';
import Footer from './Footer';
import Navbar from '../components/NavBar';
import { fetchProductById } from '../Redux/propertySlice';
import { addItemToCart, updateCartItemQuantity } from '../Redux/CartSlice';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { product, loading, error } = useSelector((state) => state.property);
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    if (paymentError) {
      console.log(err);
      toast.error(paymentError);
      setPaymentError(null);
    }
  }, [paymentError]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

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

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login to continue");
      nav("/login");
      return;
    }

    if (!product?.product) {
      toast.error("Product information not available");
      return;
    }

    try {
      const orderData = {
        amount: Math.round(Number(product.product.price)), // Ensure whole number
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        user_id: user.user_id,
        product_ids: [id],
        quantities: [1]
      };
      
      const orderResult = await dispatch(createRazorpayOrder(orderData)).unwrap();
      
      if (!orderResult?.order?.id) {
        toast.error("Failed to create order");
        return;
      }

      const options = {
        key: "rzp_test_suGlReUubwbXnb",
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "Product Purchase",
        description: `Payment for ${product.product.title}`,
        order_id: orderResult.order.id,
        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.user_id,
              product_ids: [id],
              amount: orderResult.order.amount,
              currency: orderResult.order.currency
            };

            const validation = await dispatch(validatePayment(paymentData)).unwrap();
            if (validation.msg) {
              toast.success("Payment successful!");
              
            }
          } catch (err) {
            console.log(err);
            toast.error(err.message || "Payment validation failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: "#EAB308" // Yellow-500 color
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      console.log(err)
      toast.error(err.message || "Failed to process the order");
    }
  };
  

  const handleAddToCart = async () => {
    if (!product || !user) return;
    setAddingToCart(true);
    try {
      const existingItem = cartItems.find(item => item.product_id === id);
      if (existingItem) {
        await dispatch(updateCartItemQuantity({
          cartId: existingItem.cart_item_id,
          quantity: existingItem.quantity + 1
        })).unwrap();
      } else {
        await dispatch(addItemToCart({
          userId: user.user_id,
          productId: id,
          quantity: 1,
          price: product.product.price
        })).unwrap();
      }
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
   return <Spinner/>
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error}</div>;
  }

  if (!user) {
    nav('/login');
    return null;
  }

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Navbar />
      <main className="max-w-6xl mx-auto pt-40">
        {/* Rest of your existing JSX remains the same */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border-2 border-yellow-500/20" style={{ minHeight: '400px', maxHeight: '600px', width: '100%' }}>
              <img
                src={product.images?.length > 0 ? product.images[selectedImage] : '/placeholder.svg'}
                alt={product.product.title || 'Product Image'}
                className="object-contain w-full h-full"
                style={{ maxHeight: '600px' }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images?.length > 0 ? (
                product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden relative flex-shrink-0 ${
                      selectedImage === index ? 'border-yellow-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))
              ) : (
                <span>No images available</span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl font-bold">{product.product.title}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-yellow-500">
                ₹{Number(product.product.price)?.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleBuyNow}
                className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Product details sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-6 h-6" />
                <h3 className="font-semibold">Product details</h3>
              </div>
              <ul className="space-y-2">
                {product.product.description.split('\n').map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-6 h-6" />
                <h3 className="font-semibold">Dimensions</h3>
              </div>
              <ul className="space-y-2">
                {product.product.dimension.split('\n').map((dim, index) => (
                  <li key={index}>{dim}</li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-6 h-6" />
                <h3 className="font-semibold">Services</h3>
              </div>
              <ul className="space-y-2">
                {product.product.services.split('\n').map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

