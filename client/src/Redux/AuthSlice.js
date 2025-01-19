import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// **Register User Thunk**
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/register', userData);
      
      // Trigger OTP verification if user is an admin
      if (userData.role === 'admin') {
        dispatch(openOTPModal(userData.email)); // Open OTP modal for admin registration
      }

      return response.data; // Expecting user data with userId
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed!' });
    }
  }
);

// **Login User Thunk**
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/login', userData);
      // Include userId in the returned data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed!' });
    }
  }
);

// **Verify OTP Thunk**
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/verify-otp', { email, otp });
      return response.data;  // Expecting verification success response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'OTP verification failed!' });
    }
  }
);

// **Logout User Thunk**
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    localStorage.clear(); // Clear any persisted data
    dispatch(clearUserData());
  }
);

// **Auth Slice Definition**
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    userId: null,
    isAuthenticated: false,
    isOTPModalOpen: false,
    otpEmail: '',
  },
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isOTPModalOpen = false;
      state.otpEmail = '';
    },
    openOTPModal: (state, action) => {
      state.isOTPModalOpen = true;
      state.otpEmail = action.payload;
    },
    closeOTPModal: (state) => {
      state.isOTPModalOpen = false;
      state.otpEmail = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // **Registration Reducers**
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || {};
        state.userId = action.payload?.user?.userId || null;  // Store userId in state
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || 'Registration failed!');
      })
      // **Login Reducers**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || {};
        state.userId = action.payload?.user?.userId || null;
        state.isAuthenticated = Boolean(action.payload?.user); // Ensure this is set based on user presence
        toast.success('Login successful!');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || 'Login failed!');
      })
      // **OTP Verification Reducers**
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isOTPModalOpen = false;
        toast.success('OTP verification successful! You are now an admin.');
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || 'OTP verification failed!');
      })
      // **Logout Reducer**
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

// **Export Actions and Reducer**
export const { clearUserData, openOTPModal, closeOTPModal } = authSlice.actions;
export default authSlice.reducer;

