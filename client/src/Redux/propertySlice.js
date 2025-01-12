import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/admin/getProducts');
      console.log('API Response:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch products' });
    }
  }
);

// Thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'product/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/admin/getProductById/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch product' });
    }
  }
);

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('dimension', productData.dimension);
      formData.append('services', productData.services);
      
      // Handle multiple images
      if (productData.imageFiles) {
        productData.imageFiles.forEach(file => {
          formData.append('imageFile', file);
        });
      }

      const response = await axios.post(
        'http://localhost:4000/api/v1/admin/addProduct',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      return rejectWithValue(error.response?.data || { message: 'Product creation failed!' });
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('dimension', productData.dimension);
      formData.append('services', productData.services);
      
      if (productData.imageFiles?.length > 0) {
        productData.imageFiles.forEach(file => {
          formData.append('imageFile', file);
        });
      }

      const response = await axios.put(
        `http://localhost:4000/api/v1/admin/updateProductById/${productData.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      return rejectWithValue(error.response?.data || { message: 'Product update failed!' });
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/admin/deleteProductById/${productId}`
      );
      return { id: productId, ...response.data };
    } catch (error) {
      console.error('Error deleting product:', error);
      return rejectWithValue(error.response?.data || { message: 'Product deletion failed!' });
    }
  }
);

// Product Slice
const productSlice = createSlice({
  name: 'product',
  initialState: { 
    loading: false, 
    error: null, 
    products: [], 
    product: null,
    success: false
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.product = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.error = null;
        console.log('Products in state:', state.products); // Debug log
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch products';
        toast.error(state.error);
      })
      
      // Fetch single product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch product';
        toast.error(state.error);
      })
      
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create product';
        state.success = false;
        toast.error(state.error);
      })
      
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update product';
        state.success = false;
        toast.error(state.error);
      })
      
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product.id !== action.payload.id);
        state.success = true;
        state.error = null;
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete product';
        state.success = false;
        toast.error(state.error);
      })
  },
});

export const { resetProductState, clearError } = productSlice.actions;
export default productSlice.reducer;
