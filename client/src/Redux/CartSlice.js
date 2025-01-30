import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://api.sarsdecor.com/api/v1";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

// Utility function to calculate total amount
const calculateTotalAmount = (cartItems) =>
  cartItems.reduce((acc, { price = 0, quantity = 1 }) => acc + price * quantity, 0);

// Thunks
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
      return response.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart items");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ userId, productId, quantity, price }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addCart`, {
        userId,
        productId,
        quantity,
        price,
      });
      return {
        cartItem: { ...response.data.cartItem, price },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add item to cart");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/cart`, { cartId, quantity });
      return { cartId, quantity, updatedItem: response.data.updatedItem };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update cart item quantity");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${cartId}`);
      return cartId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove cart item");
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/clear/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear user cart");
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.map((item) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
          images: item.images || [], // Adding images for UI rendering
        }));
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const { cartItem } = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === cartItem.id);
        if (existingItem) {
          existingItem.quantity += cartItem.quantity;
        } else {
          state.cartItems.push(cartItem);
        }
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { cartId, quantity, updatedItem } = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === cartId);
        if (existingItem) {
          existingItem.quantity = Number(quantity);
          Object.assign(existingItem, updatedItem);
        }
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.loading = false;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        state.totalAmount = calculateTotalAmount(state.cartItems);
        state.loading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(clearUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.loading = false;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
