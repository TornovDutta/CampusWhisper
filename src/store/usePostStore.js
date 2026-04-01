import { create } from 'zustand';
import axios from '../api/axios.js';
import { useAuthStore } from './useAuthStore.js'; // Ensure Axios has intercepted the state with token, or rely on Axios interceptor. 

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  
  fetchPosts: async (category = '') => {
    set({ isLoading: true, error: null });
    try {
      const endpoint = category ? `/posts?category=${category}` : '/posts';
      const response = await axios.get(endpoint);
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to load posts', isLoading: false });
    }
  },

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/posts', postData);
      set((state) => ({ posts: [response.data, ...state.posts], isLoading: false }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create post', isLoading: false });
      return false;
    }
  },

  upvotePost: async (postId) => {
    try {
      await axios.post('/votes', { postId, type: 'upvote' });
      // Depending on API response, you might need to refetch or update state optimistically
      set((state) => ({
        posts: state.posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1} : post)
      }));
    } catch (error) {
       console.error('Failed to upvote', error);
    }
  },

  downvotePost: async (postId) => {
     try {
       await axios.post('/votes', { postId, type: 'downvote' });
       // Optimistic update
       set((state) => ({
         posts: state.posts.map(post => post.id === postId ? { ...post, downvotes: post.downvotes + 1} : post)
       }));
     } catch (error) {
       console.error('Failed to downvote', error);
     }
  }
}));
