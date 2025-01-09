import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL base
const API_URL = 'http://localhost:4000/api/v1/reservation';
const PAYMENT_API_URL = 'http://localhost:4000/api/v1/payments';

// Async thunk to create a reservation
export const createReservation = createAsyncThunk(
  'payment/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/Createreservations`, reservationData);
      return response.data; // Reservation data (message, reservationId, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  'payment/createRazorpayOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/order`, orderData);
      console.log("payment response->",response.data);
      return response.data; // Razorpay order data (order_id, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to validate the payment and create reservation

export const validatePayment = createAsyncThunk(
  'payment/validatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/validate`, paymentData);
      return response.data; // Payment validation success message
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to update payment status
export const updatePaymentStatus = createAsyncThunk(
  'payment/updatePaymentStatus',
  async ({ reservation_id, payment_status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/paymentStatus`, { reservation_id, payment_status });
      return response.data; // Payment status update message
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to fetch user reservations
export const getUserReservations = createAsyncThunk(
  'payment/getUserReservations',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getReservationByUserID/${user_id}`);
      return response.data; // List of user reservations
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);
export const getAllReservations = createAsyncThunk(
  'payment/getAllReservations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getReservation`);
      return response.data; // List of all reservations
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);
// PaymentSlice
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    reservation: null,
    razorpayOrder: null, // Store Razorpay order data
    paymentStatus: 'pending', // pending, success, failed
    reservations: [], // Array of user reservations
    allReservations: [], // Array of all reservations (if needed)
    error: null,
    loading: false,
  },
  reducers: {
    resetPaymentStatus: (state) => {
      state.paymentStatus = 'pending';
      state.error = null;
    },
    resetReservations: (state) => {
      state.reservations = [];
      state.error = null;
    },
    resetAllReservations: (state) => {
      state.allReservations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getAllReservations (all reservations in the system)
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.allReservations = action.payload; // Set all reservations (from the system)
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload.message;
      });

    // Handle getUserReservations (user-specific reservations)
    builder
      .addCase(getUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload; // Set user reservations
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload.message;
      });
  },
});

export const { resetPaymentStatus, resetReservations, resetAllReservations } = paymentSlice.actions;
export default paymentSlice.reducer;


