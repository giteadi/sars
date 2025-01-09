import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch property availability by ID
export const fetchPropertyAvailabilityById = createAsyncThunk(
  'propertyAvailability/fetchById',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/check/chekAvialibilityById/${propertyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Async thunk to add property availability
export const addPropertyAvailability = createAsyncThunk(
  'propertyAvailability/addAvailability',
  async ({ property_id, start_date, end_date, is_booked = 0, number_of_guests, user_id }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/check/addAvialibility', {
        property_id,
        start_date,
        end_date,
        is_booked,
        number_of_guests,
        user_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Async thunk to check booking conflicts using the reservation API
export const checkBookingConflicts = createAsyncThunk(
  'propertyAvailability/checkBookingConflicts',
  async ({ selectedStartDate, selectedEndDate, propertyId }, { rejectWithValue }) => {
    try {
      // Fetch reservations from the API
      const reservationResponse = await axios.get(
        `http://localhost:4000/api/v1/reservation/getReservationByPropertyID/${propertyId}`
      );
      const reservationData = reservationResponse.data.data;

      // Check for conflicts with the reservation data
      const hasConflictWithReservations = reservationData.some((reservation) => {
        const reservationStartDate = new Date(reservation.start_date);
        const reservationEndDate = new Date(reservation.end_date);

        return (
          (selectedStartDate >= reservationStartDate && selectedStartDate <= reservationEndDate) ||
          (selectedEndDate >= reservationStartDate && selectedEndDate <= reservationEndDate) ||
          (selectedStartDate <= reservationStartDate && selectedEndDate >= reservationEndDate)
        );
      });

      // Return true if there is a conflict with reservations
      return hasConflictWithReservations;
    } catch (error) {
      console.error('Error checking booking conflicts:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Initial state
const initialState = {
  availability: null,
  conflict: null, // Store the result of the conflict check
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Slice
const propertyAvailabilitySlice = createSlice({
  name: 'propertyAvailability',
  initialState,
  reducers: {
    clearAvailabilityState: (state) => {
      state.availability = null;
      state.conflict = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Property Availability
      .addCase(fetchPropertyAvailabilityById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPropertyAvailabilityById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availability = action.payload;
      })
      .addCase(fetchPropertyAvailabilityById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Property Availability
      .addCase(addPropertyAvailability.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPropertyAvailability.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availability = action.payload; // Assuming we update the availability after adding
      })
      .addCase(addPropertyAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Check Booking Conflicts
      .addCase(checkBookingConflicts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkBookingConflicts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conflict = action.payload; // Store conflict result (true/false)
      })
      .addCase(checkBookingConflicts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Actions
export const { clearAvailabilityState } = propertyAvailabilitySlice.actions;

// Reducer
export default propertyAvailabilitySlice.reducer;
