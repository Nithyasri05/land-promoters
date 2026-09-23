import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/propertySlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});
