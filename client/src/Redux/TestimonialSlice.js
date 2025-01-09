import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1/testimonial';

// Async Thunks
export const addReview = createAsyncThunk(
  'testimonials/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addReview`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllReviews = createAsyncThunk(
  'testimonials/fetchAllReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllReview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsByPropertyId = createAsyncThunk(
  'testimonials/fetchReviewsByPropertyId',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getReviewByPropertyId/${propertyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewById = createAsyncThunk(
  'testimonials/updateReviewById',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updateReviewByID/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'testimonials/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteReview/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    reviews: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch All Reviews
      .addCase(fetchAllReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload || []; // Ensure it's always an array
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Reviews by Property ID
      .addCase(fetchReviewsByPropertyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsByPropertyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload || []; // Ensure it's always an array
      })
      .addCase(fetchReviewsByPropertyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Review
      .addCase(updateReviewById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReviewById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          // Only update the message and rating fields, not user_name
          state.reviews[index] = {
            ...state.reviews[index], // Keep the original review data
            message: action.payload.message, // Update the message
            rating: action.payload.rating, // Update the rating
            // Do not overwrite user_name (keep original)
          };
        }
      })
      .addCase(updateReviewById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload.id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default testimonialsSlice.reducer;
