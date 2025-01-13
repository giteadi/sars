import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
} from "../Redux/CartSlice";
import { ShoppingCart, Trash, ChevronRight } from "lucide-react";
import Footer from "../pages/Footer";

export default function Cart() {
  const dispatch = useDispatch();

  // Fetch user information from the auth state
  const user = useSelector((state) => state.auth.user);

  // Fetch cart state
  const { cartItems, totalAmount, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.id) {
      // Fetch cart items for the logged-in user
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  const handleRemoveItem = (cartId) => {
    dispatch(removeCartItem(cartId));
  };

  const handleUpdateQuantity = (cartId, action) => {
    const currentItem = cartItems.find((item) => item.cart_item_id === cartId);

    if (currentItem) {
      const newQuantity = action === "increase" ? currentItem.quantity + 1 : currentItem.quantity - 1;

      if (newQuantity > 0) {
        dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }));
      }
    }
  };

  const handleClearCart = () => {
    if (user?.id) {
      dispatch(clearUserCart(user.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Cart Header */}
      <header className="p-4 border-b border-yellow-500/20">
        <div className="text-yellow-500 font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          CART
        </div>
      </header>

      {/* Cart Items */}
      <main className="flex-grow max-w-6xl mx-auto p-4">
        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-xl font-semibold">Your cart is empty</div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.cart_item_id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg" alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.cart_item_id, "decrease")}
                    className="px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.cart_item_id, "increase")}
                    className="px-4 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.cart_item_id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-yellow-500">₹{totalAmount}</span>
          </div>
        )}

        {/* Checkout and Clear Cart Buttons */}
        {cartItems.length > 0 && (
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
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
