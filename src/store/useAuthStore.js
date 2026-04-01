import { create } from 'zustand';
import axios from '../api/axios.js';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/login', credentials);
      const token = response.data.token || response.data; // adjust based on actual api response structure
      localStorage.setItem('token', token);
      set({ token, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      return false;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('/auth/register', userData);
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      return false;
    }
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ error: null, isLoading: false, user: null });
      // The interceptor will logout on 401 anyway
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
