import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Thunk to fetch all properties
export const fetchProperties = createAsyncThunk(
  'property/getAllProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/property/getAllProperties');
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch properties' });
    }
  }
);

// Thunk to fetch a single property by ID
export const fetchPropertyById = createAsyncThunk(
  'property/getPropertyById',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/property/getPropertyById/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch property by ID' });
    }
  }
);

// Thunk to create a new property
export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', propertyData.title);
      formData.append('description', propertyData.description);
      formData.append('price', propertyData.price);
      formData.append('location', propertyData.location);
      formData.append('bedrooms', propertyData.bedrooms);
      formData.append('amenities', propertyData.amenities.join(','));
      formData.append('bathrooms', propertyData.bathrooms);
      formData.append('is_premium', propertyData.is_premium ? '1' : '0');
      
      propertyData.imageFiles.forEach(file => {
        formData.append('imageFile', file);
      });

      const response = await axios.post(
        'http://localhost:4000/api/v1/property/createProperty',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      return rejectWithValue(error.response?.data || { message: 'Property creation failed!' });
    }
  }
);

// Thunk to update a property
export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', propertyData.title);
      formData.append('description', propertyData.description);
      formData.append('price', propertyData.price);
      formData.append('location', propertyData.location);
      formData.append('bedrooms', propertyData.bedrooms);
      formData.append('amenities', propertyData.amenities.join(','));
      formData.append('bathrooms', propertyData.bathrooms);
      // Ensure is_premium is explicitly 0 or 1
      formData.append('is_premium', propertyData.is_premium ? '1' : '0');
      
      if (propertyData.imageFiles?.length > 0) {
        propertyData.imageFiles.forEach(file => {
          formData.append('imageFile', file);
        });
      }

      const response = await axios.put(
        `http://localhost:4000/api/v1/property/updatePropertyById/${propertyData.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating property:', error);
      return rejectWithValue(error.response?.data || { message: 'Property update failed!' });
    }
  }
);

// Thunk to delete a property
export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/property/deletePropertyById/${propertyId}`
      );
      return { id: propertyId, ...response.data };
    } catch (error) {
      console.error('Error deleting property:', error);
      return rejectWithValue(error.response?.data || { message: 'Property deletion failed!' });
    }
  }
);

// Thunk to fetch filtered properties
export const fetchFilteredProperties = createAsyncThunk(
  'property/getFilteredProperties',
  async ({ destination, checkin, checkout, price_min, price_max, bedrooms, bathrooms, amenities, is_premium }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        destination,
        checkin,
        checkout,
        price_min: price_min || '',
        price_max: price_max || '',
        bedrooms: bedrooms || '',
        bathrooms: bathrooms || '',
        amenities: amenities?.join(',') || '',
        is_premium: is_premium || '',
      }).toString();

      const response = await axios.get(`http://localhost:4000/api/v1/property/getFilteredProperties?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch filtered properties');
    }
  }
);


// Property Slice
const propertySlice = createSlice({
  name: 'property',
  initialState: { 
    loading: false, 
    error: null, 
    properties: [], 
    premiumProperties: [], 
    regularProperties: [], 
    property: null, 
    filteredProperties: [],
  },
  reducers: {
    resetPropertyState: (state) => {
      state.loading = false;
      state.error = null;
      state.property = null;
    },
    clearFilteredProperties: (state) => {
      state.filteredProperties = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.premiumProperties = action.payload.filter(property => property.is_premium == 1);
        state.regularProperties = action.payload.filter(property => property.is_premium == 0);
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch properties';
        toast.error(state.error);
      })
      
      // Fetch single property by ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch property';
        toast.error(state.error);
      })
      
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.loading = false;
        toast.success('Property created successfully');
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create property';
        toast.error(state.error);
      })
      
      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state) => {
        state.loading = false;
        toast.success('Property updated successfully');
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update property';
        toast.error(state.error);
      })
      
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(property => property.id !== action.payload.id);
        state.premiumProperties = state.premiumProperties.filter(property => property.id !== action.payload.id);
        state.regularProperties = state.regularProperties.filter(property => property.id !== action.payload.id);
        toast.success('Property deleted successfully');
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete property';
        toast.error(state.error);
      })
      
      // Fetch filtered properties
      .addCase(fetchFilteredProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProperties = action.payload;
      })
      .addCase(fetchFilteredProperties.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload?.message || 'No available properties for this date';
        
      });
  },
});

export const { resetPropertyState, clearFilteredProperties } = propertySlice.actions;
export default propertySlice.reducer;