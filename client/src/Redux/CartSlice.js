import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Array to store cart items
  totalAmount: 0, // Tracks the total value of the cart
};

// Utility function to calculate totalAmount
const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to the cart or update quantity if it exists
    addToCart: (state, action) => {
      const { cart_item_id, item_id, title, description, price, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.cart_item_id === cart_item_id
      );

      if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if item exists
      } else {
        state.cartItems.push({
          cart_item_id,
          item_id,
          title,
          description,
          price,
          quantity,
        }); // Add new item to the cart
      }

      // Update the total amount after adding an item
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },

    // Remove item from the cart by `cart_item_id`
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.cart_item_id !== action.payload
      );

      // Update the total amount after removing an item
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },

    // Update item quantity in the cart by `cart_item_id`
    updateCartItem: (state, action) => {
      const { cart_item_id, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cart_item_id === cart_item_id
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      // Update the total amount after quantity update
      state.totalAmount = calculateTotalAmount(state.cartItems);
    },

    // Set the total amount of the cart
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    // Clear all items in the cart and reset total amount
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

// Exporting actions and the reducer
export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  setTotalAmount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
