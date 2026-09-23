import axios from 'axios';
import { tokenStore } from '../lib/tokenStore';

const API = axios.create({
  baseURL: '/api/landpromoters',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15s request timeout — prevents hanging requests in production
});

// ─── Request Interceptor ───────────────────────────────────────────────────────
// Attach JWT from secure in-memory store (NOT localStorage)
API.interceptors.request.use(
  (config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Handle 401 globally — clear token and redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (window.location.pathname.startsWith('/admin')) {
        tokenStore.clear();
        window.location.replace('/admin'); // replace() doesn't add to browser history
      }
    }
    return Promise.reject(error);
  }
);

export default API;
