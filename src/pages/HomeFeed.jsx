import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Search,
  PenSquare,
  X,
  Compass
} from "lucide-react";
import { usePostStore } from "../store/usePostStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { PostCard } from "../components/ui/PostCard.jsx";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { CreatePostModal } from "../components/modals/CreatePostModal.jsx";
import { InlineFeedComposer } from "../components/ui/InlineFeedComposer.jsx";
import { cn } from "../utils/cn.js";

const FILTER_TAGS = [
  { id: "all", label: "All Whispers" },
  { id: "placement", label: "Placements" },
  { id: "academics", label: "Academics" },
  { id: "events", label: "Events" },
  { id: "confessions", label: "Confessions" },
  { id: "general", label: "General" },
];

const SORT_OPTIONS = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "latest", label: "Latest", icon: Clock },
  { id: "discussed", label: "Top Discussed", icon: MessageSquare },
];

export function HomeFeed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const { 
    posts, 
    fetchPosts, 
    isLoading, 
    error,
    activeSort,
    setActiveSort,
    searchQuery,
    setSearchQuery
  } = usePostStore();
  
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(categoryParam || "all");

  useEffect(() => {
    const cat = categoryParam || "";
    setActiveTab(categoryParam || "all");
    fetchPosts(cat);
  }, [categoryParam, fetchPosts]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: tabId });
    }
  };

  // Filter and Sort live database posts locally
  const processedPosts = useMemo(() => {
    let result = [...posts];

    // Category Filter
    if (activeTab !== "all") {
      result = result.filter(
        (p) => (p.category || "").toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.content?.toLowerCase().includes(q) ||
          p.anonymousUsername?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (activeSort === "trending") {
      result.sort((a, b) => ((b.upvotes || 0) - (b.downvotes || 0)) - ((a.upvotes || 0) - (a.downvotes || 0)));
    } else if (activeSort === "latest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (activeSort === "discussed") {
      result.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
    }

    return result;
  }, [posts, activeTab, searchQuery, activeSort]);

  return (
    <div className="w-full py-6 space-y-6 animate-fade-in">
      
      {/* Feed Hero Header & Tabs */}
      <div className="space-y-4">
        
        {/* Top Title & Quick Action */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-500" />
              <span>{activeTab === "all" ? "Live Campus Whispers" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Channel`}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live database stream. Anonymous student discourse with zero digital footprint.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-indigo-600/25 border border-indigo-400/20 transition-all hover:scale-102 active:scale-98 shrink-0"
          >
            <PenSquare size={15} />
            <span>New Whisper</span>
          </button>
        </div>

        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          {FILTER_TAGS.map((tag) => {
            const isActive = activeTab === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => handleTabChange(tag.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap border shrink-0",
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25"
                    : "glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* Sort & Search Status Bar */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-200 dark:border-white/[0.06]">
          {/* Sorting Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-300 dark:border-slate-800/70">
            {SORT_OPTIONS.map((sort) => {
              const Icon = sort.icon;
              const isSelected = activeSort === sort.id;
              return (
                <button
                  key={sort.id}
                  onClick={() => setActiveSort(sort.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all",
                    isSelected
                      ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-700"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  <Icon size={13} />
                  <span>{sort.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Search Badge */}
          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-xl animate-fade-in">
              <Search size={12} />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">"{searchQuery}"</span>
              <button 
                onClick={() => setSearchQuery("")}
                className="hover:text-slate-900 dark:hover:text-white"
                title="Clear search"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Top Inline Composer */}
      <InlineFeedComposer />

      {/* Feed Content Stream */}
      <div className="space-y-4">
        {isLoading && posts.length === 0 && (
          <div className="py-12 flex justify-center">
            <Loader size={36} />
          </div>
        )}

        {error && <ErrorMessage message={error} onRetry={() => fetchPosts(activeTab === 'all' ? '' : activeTab)} />}

        {!isLoading && !error && processedPosts.length === 0 && (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-3">
            <EmptyState 
              message={
                searchQuery
                  ? `No whispers found matching "${searchQuery}".`
                  : `No whispers found in the ${activeTab} channel yet.`
              }
              icon={Compass}
            />
            <button
              onClick={() => {
                if (searchQuery) setSearchQuery("");
                else setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              {searchQuery ? "Clear Search" : "Publish the First Whisper"}
            </button>
          </div>
        )}

        {processedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Floating Modal */}
      {isModalOpen && (
        <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}

    </div>
  );
}
