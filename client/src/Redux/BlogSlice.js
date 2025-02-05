import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const BASE_URL = 'https://api.sarsdecor.com/api/v1/blogs';

// Initial state
const initialState = {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
};

// Helper function for handling API errors
const handleError = (error, rejectWithValue) => {
    return rejectWithValue(error.response ? error.response.data.message : error.message);
};

// Async thunks
export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL, blogData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.blog;
    } catch (error) {
        return handleError(error, rejectWithValue);
    }
});

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.blogs;
    } catch (error) {
        return handleError(error, rejectWithValue);
    }
});

export const getBlogById = createAsyncThunk('blogs/getBlogById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data.blog;
    } catch (error) {
        return handleError(error, rejectWithValue);
    }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (blogData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${blogData.id}`, blogData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.blog;
    } catch (error) {
        return handleError(error, rejectWithValue);
    }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    } catch (error) {
        return handleError(error, rejectWithValue);
    }
});

// Blog slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload);
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAllBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getBlogById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
                if (index !== -1) state.blogs[index] = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blogSlice.reducer;
