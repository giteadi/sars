import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
};

// Async actions (thunks) for making API calls
export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/blogs', blogData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;  // Response will include the blog details with image URL
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/blogs');
        return response.data.blogs;  // Assuming the response contains a "blogs" array
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

export const getBlogById = createAsyncThunk('blogs/getBlogById', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/blogs/${id}`);
        return response.data.blog;  // Assuming the response contains a single "blog" object
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (blogData) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/blogs/${blogData.id}`, blogData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.blog;  // Assuming response contains updated blog
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
    try {
        await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`);
        return id;  // Returning the blog ID to remove it from the state
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

// Slice definition
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add blog
            .addCase(addBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload.blog);
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get all blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get blog by ID
            .addCase(getBlogById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.blog = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update blog
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete blog
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default blogSlice.reducer;
