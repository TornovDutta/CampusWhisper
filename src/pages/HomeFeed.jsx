import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PenSquare } from "lucide-react";
import { usePostStore } from "../store/usePostStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { PostCard } from "../components/ui/PostCard.jsx";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { CreatePostModal } from "../components/modals/CreatePostModal.jsx";

export function HomeFeed() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  
  const { posts, fetchPosts, isLoading, error } = usePostStore();
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    fetchPosts(category);
  }, [category, fetchPosts]);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 sm:pb-8 relative">
       {/* Top Bar for Creating Posts */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100 capitalize">
          {category ? `${category} Whispers` : 'All Whispers'}
        </h1>

        {isLoggedIn && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            <PenSquare size={16} />
            <span className="hidden sm:inline">New Whisper</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {isLoading && posts.length === 0 && <Loader size={32} />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && posts.length === 0 && (
           <EmptyState message="No whispers found. Be the first to share!" />
        )}
        
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isModalOpen && (
        <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
