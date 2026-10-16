import { create } from 'zustand';
import axios from '../api/axios.js';

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  activeFilter: 'all',
  activeSort: 'trending',
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setActiveSort: (sort) => set({ activeSort: sort }),

  // Pure database fetching from the Spring Boot API
  fetchPosts: async (category = '') => {
    set({ isLoading: true, error: null });
    try {
      const endpoint = category && category !== 'all' ? `/posts?category=${category}` : '/posts';
      const response = await axios.get(endpoint);
      set({ 
        posts: Array.isArray(response.data) ? response.data : [], 
        isLoading: false, 
        error: null 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch whispers from the server database.', 
        isLoading: false, 
        posts: [] 
      });
    }
  },

  // Save directly to database
  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/posts', {
        content: postData.content,
        category: postData.category || 'general'
      });
      
      if (response?.data) {
        set((state) => ({ 
          posts: [response.data, ...state.posts], 
          isLoading: false,
          error: null 
        }));
        return true;
      }
      return false;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Unable to create post on the database.', 
        isLoading: false 
      });
      return false;
    }
  },

  // Real voting against database API
  upvotePost: async (postId) => {
    // Optimistic UI state update
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const wasUpvoted = post.hasUpvoted;
          const wasDownvoted = post.hasDownvoted;
          return {
            ...post,
            upvotes: wasUpvoted ? Math.max(0, (post.upvotes || 0) - 1) : (post.upvotes || 0) + 1,
            downvotes: wasDownvoted ? Math.max(0, (post.downvotes || 0) - 1) : (post.downvotes || 0),
            hasUpvoted: !wasUpvoted,
            hasDownvoted: false,
          };
        }
        return post;
      }),
    }));

    try {
      await axios.post('/votes', { postId, type: 'upvote' });
    } catch (err) {
      // Revert if vote failed
      get().fetchPosts(get().activeFilter === 'all' ? '' : get().activeFilter);
    }
  },

  downvotePost: async (postId) => {
    // Optimistic UI state update
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const wasDownvoted = post.hasDownvoted;
          const wasUpvoted = post.hasUpvoted;
          return {
            ...post,
            downvotes: wasDownvoted ? Math.max(0, (post.downvotes || 0) - 1) : (post.downvotes || 0) + 1,
            upvotes: wasUpvoted ? Math.max(0, (post.upvotes || 0) - 1) : (post.upvotes || 0),
            hasDownvoted: !wasDownvoted,
            hasUpvoted: false,
          };
        }
        return post;
      }),
    }));

    try {
      await axios.post('/votes', { postId, type: 'downvote' });
    } catch (err) {
      // Revert if vote failed
      get().fetchPosts(get().activeFilter === 'all' ? '' : get().activeFilter);
    }
  },
}));
