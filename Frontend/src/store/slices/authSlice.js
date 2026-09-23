import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';
import { tokenStore } from '../../lib/tokenStore';

const initialState = {
  token: tokenStore.get(),
  isAuthenticated: Boolean(tokenStore.get()),
  admin: null,
  loading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/admin/login', credentials);
      // Store token securely in module-level memory (not localStorage)
      tokenStore.set(data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.admin = null;
      state.error = null;
      tokenStore.clear();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.admin = action.payload.admin || null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        tokenStore.clear();
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
