import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(state, action) {
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      state.toasts.push({ ...action.payload, id });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
  },
});

export const { addToast, removeToast, clearToasts, toggleMobileMenu, closeMobileMenu } =
  uiSlice.actions;
export default uiSlice.reducer;
