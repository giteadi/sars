import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
} from "../Redux/CartSlice";
import { ShoppingCart, Trash, ChevronRight, Plus, Minus } from 'lucide-react';
import Footer from "../pages/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  // Fetch cart items when the user is available
  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchCartItems(user.user_id));
    }
  }, [dispatch, user]);

  // Log cart items for debugging
  useEffect(() => {
    console.log("Cart items:", cartItems); // Check cart items after the fetch
  }, [cartItems]);

  // Handle item removal
  const handleRemoveItem = (cartId) => {
    dispatch(removeCartItem(cartId));
  };

  // Handle quantity update
  const handleUpdateQuantity = (cartId, action) => {
    const currentItem = cartItems.find((item) => item.id === cartId);

    if (currentItem) {
      const newQuantity = action === "increase" ? currentItem.quantity + 1 : currentItem.quantity - 1;

      if (newQuantity > 0) {
        dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }));
      } else if (newQuantity === 0) {
        dispatch(removeCartItem(cartId));
      }
    }
  };

  // Handle clear cart action
  const handleClearCart = () => {
    if (user?.id) {
      dispatch(clearUserCart(user.user_id));
    }
  };

  // Loading state
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="p-4 border-b border-yellow-500/20">
        <div className="text-yellow-500 font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          CART
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-xl font-semibold">Your cart is empty</div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id || item.cart_item_id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.id || item.cart_item_id, "decrease")}
                    className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id || item.cart_item_id, "increase")}
                    className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id || item.cart_item_id)}
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

        {cartItems.length > 0 && (
          <>
            <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <span className="text-xl font-semibold">Total:</span>
                <span className="ml-2 text-sm text-gray-400">
                  ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
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
              <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-colors flex items-center gap-2">
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
