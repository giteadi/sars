import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
    "contact/submitContactForm",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/contact", formData);
            return response.data; // Assuming backend sends a success message
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || "Failed to send your message. Please try again.";
            return rejectWithValue(errorMessage);
        }
    }
);

// Contact slice
const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetContactState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
