import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

const initialState = {
  properties: [],
  featuredProperties: [],
  currentProperty: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  filters: {
    keyword: '',
    propertyType: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
    page: 1,
    limit: 9,
  },
  loading: false,
  featuredLoading: false,
  detailLoading: false,
  error: null,
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      const { data } = await API.get(`/properties?${params.toString()}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

export const fetchFeaturedProperties = createAsyncThunk(
  'property/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/properties/featured');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured properties');
    }
  }
);

export const fetchPropertyBySlug = createAsyncThunk(
  'property/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/properties/${slug}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Property not found');
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    clearCurrentProperty(state) {
      state.currentProperty = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch featured
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.featuredLoading = true;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featuredProperties = action.payload.properties;
      })
      .addCase(fetchFeaturedProperties.rejected, (state) => {
        state.featuredLoading = false;
      })
      // Fetch by slug
      .addCase(fetchPropertyBySlug.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyBySlug.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentProperty = action.payload.property;
      })
      .addCase(fetchPropertyBySlug.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, clearCurrentProperty, clearError } =
  propertySlice.actions;
export default propertySlice.reducer;
