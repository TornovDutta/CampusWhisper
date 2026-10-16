import { create } from 'zustand';
import axios from '../api/axios.js';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('campus_user') || 'null'),
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Authenticate strictly with backend database
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/auth/login', credentials);
      const token = response.data.token || response.data;
      
      localStorage.setItem('token', token);
      set({ token, isLoading: false, error: null });

      // Fetch user profile from database
      await get().fetchMe();
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid credentials or backend database unreachable.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  // Register strictly in database
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post('/auth/register', userData);
      set({ isLoading: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please check user details.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  // Fetch student session from database
  fetchMe: async () => {
    const currentToken = get().token;
    if (!currentToken) return;

    set({ isLoading: true });
    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data, isLoading: false, error: null });
      localStorage.setItem('campus_user', JSON.stringify(response.data));
    } catch (error) {
      // If unauthorized, log out
      if (error.response?.status === 401) {
        get().logout();
      }
      set({ isLoading: false });
    }
  },

  // Terminate session
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('campus_user');
    set({ user: null, token: null, error: null });
  },
}));
