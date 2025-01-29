import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PAYMENT_API_URL = 'http://13.60.99.223:8000/api/v1/payments';

// Create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  'payment/createRazorpayOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/order`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { 
        msg: 'Failed to create order',
        details: error.message 
      });
    }
  }
);

// Validate payment with better error handling
export const validatePayment = createAsyncThunk(
  'payment/validatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/validate`, paymentData);
      return response.data;
    } catch (error) {
      // Log the full error for debugging
      console.error('Payment validation error:', error.response || error);
      
      return rejectWithValue({
        msg: error.response?.data?.msg || 'Payment validation failed',
        details: error.response?.data?.details || error.message,
        status: error.response?.status
      });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    order: null,
    paymentStatus: 'pending',
    loading: false,
    error: null,
    lastError: null // Store detailed error information
  },
  reducers: {
    resetPayment: (state) => {
      state.order = null;
      state.paymentStatus = 'pending';
      state.error = null;
      state.lastError = null;
    },
    clearError: (state) => {
      state.error = null;
      state.lastError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || 'Failed to create order';
        state.lastError = action.payload;
      })
      .addCase(validatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validatePayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentStatus = 'success';
      })
      .addCase(validatePayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = 'failed';
        state.error = action.payload?.msg || 'Payment validation failed';
        state.lastError = action.payload;
      });
  }
});

export const { resetPayment, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;

