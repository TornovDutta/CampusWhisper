import { create } from 'zustand';
import axios from '../api/axios.js';

// Clean, realistic fallback posts (strictly NO emojis)
const INITIAL_DEMO_POSTS = [
  {
    id: "post-101",
    anonymousUsername: "Anonymous Falcon",
    content: "Microsoft and Google campus drive shortlists just dropped for final year engineering. The online assessment focused heavily on dynamic programming, graph traversals, and SQL optimizations. Prepare system design fundamentals thoroughly for technical rounds.",
    category: "placement",
    upvotes: 48,
    downvotes: 2,
    commentCount: 16,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35m ago
  },
  {
    id: "post-102",
    anonymousUsername: "Silent Architect",
    content: "Prof. Sharma updated the grading policy for Advanced Algorithms and Distributed Systems. Relative grading curve will be applied, and practice question banks for finals are now uploaded to the student portal.",
    category: "academics",
    upvotes: 34,
    downvotes: 1,
    commentCount: 9,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2h ago
  },
  {
    id: "post-103",
    anonymousUsername: "Campus Pulse",
    content: "Annual Inter-University Hackathon registrations officially open this Friday. Features a 36-hour sprint with AI/ML, Web3, and Distributed Cloud tracks. Hardware labs and high-speed fiber workstations will stay accessible 24/7.",
    category: "events",
    upvotes: 72,
    downvotes: 3,
    commentCount: 24,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4h ago
  },
  {
    id: "post-104",
    anonymousUsername: "Hidden Sentinel",
    content: "Balancing six lab courses, project deliverables, and interview preparation can feel daunting. If you are struggling with burnout this week, please reach out to student counselors or study groups. Your mental well-being takes precedence over any single GPA metric.",
    category: "confessions",
    upvotes: 112,
    downvotes: 0,
    commentCount: 31,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6h ago
  },
  {
    id: "post-105",
    anonymousUsername: "Midnight Raven",
    content: "The newly renovated south wing of the Central Library has dedicated individual focus pods, quiet study cubicles with dual power sockets, and ultra-low latency gigabit Wi-Fi. Perfect environment for late-night research.",
    category: "general",
    upvotes: 53,
    downvotes: 2,
    commentCount: 11,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), // 12h ago
  },
  {
    id: "post-106",
    anonymousUsername: "Cipher Fox",
    content: "Tip for junior students preparing for summer analyst internships: focus equally on communication clarity and structured problem formulation rather than solely memorizing edge test cases. Mock interviews with alumni help immensely.",
    category: "placement",
    upvotes: 61,
    downvotes: 1,
    commentCount: 14,
    hasUpvoted: false,
    hasDownvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 1200).toISOString(), // 20h ago
  }
];

export const usePostStore = create((set, get) => ({
  posts: INITIAL_DEMO_POSTS,
  isLoading: false,
  error: null,
  activeFilter: 'all',
  activeSort: 'trending',
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setActiveSort: (sort) => set({ activeSort: sort }),

  fetchPosts: async (category = '') => {
    set({ isLoading: true, error: null });
    try {
      const endpoint = category ? `/posts?category=${category}` : '/posts';
      const response = await axios.get(endpoint);
      if (Array.isArray(response.data) && response.data.length > 0) {
        set({ posts: response.data, isLoading: false });
      } else {
        // Fallback to demo posts filtered if empty
        const filtered = category
          ? INITIAL_DEMO_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase())
          : INITIAL_DEMO_POSTS;
        set({ posts: filtered, isLoading: false });
      }
    } catch (error) {
      // Backend unavailable: gracefully supply fallback posts
      const filtered = category
        ? INITIAL_DEMO_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        : INITIAL_DEMO_POSTS;
      set({ posts: filtered, isLoading: false, error: null });
    }
  },

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    
    // Generate a sleek anonymous alias
    const anonymousAliases = [
      "Anonymous Falcon",
      "Silent Architect",
      "Encrypted Badger",
      "Hidden Sentinel",
      "Campus Pulse",
      "Midnight Raven",
      "Cipher Fox",
      "Shadow Lynx",
      "Echo Nomad"
    ];
    const randomAlias = anonymousAliases[Math.floor(Math.random() * anonymousAliases.length)];

    const newLocalPost = {
      id: `post-${Date.now()}`,
      anonymousUsername: randomAlias,
      content: postData.content,
      category: postData.category || 'general',
      upvotes: 1,
      downvotes: 0,
      commentCount: 0,
      hasUpvoted: true,
      hasDownvoted: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post('/posts', postData);
      const postToAdd = response?.data || newLocalPost;
      set((state) => ({ posts: [postToAdd, ...state.posts], isLoading: false }));
      return true;
    } catch (error) {
      // Offline fallback: optimistically add local post
      set((state) => ({ posts: [newLocalPost, ...state.posts], isLoading: false }));
      return true;
    }
  },

  upvotePost: async (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const wasUpvoted = post.hasUpvoted;
          const wasDownvoted = post.hasDownvoted;
          return {
            ...post,
            upvotes: wasUpvoted ? Math.max(0, post.upvotes - 1) : post.upvotes + 1,
            downvotes: wasDownvoted ? Math.max(0, post.downvotes - 1) : post.downvotes,
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
      // Fail quietly, optimistic update preserved
    }
  },

  downvotePost: async (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const wasDownvoted = post.hasDownvoted;
          const wasUpvoted = post.hasUpvoted;
          return {
            ...post,
            downvotes: wasDownvoted ? Math.max(0, post.downvotes - 1) : post.downvotes + 1,
            upvotes: wasUpvoted ? Math.max(0, post.upvotes - 1) : post.upvotes,
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
      // Fail quietly, optimistic update preserved
    }
  },
}));
