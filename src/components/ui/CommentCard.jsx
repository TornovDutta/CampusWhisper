import { useState, useEffect } from "react";
import { ThumbsUp, Clock, ShieldCheck } from "lucide-react";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";
import axios from "../../api/axios.js";
import { useAuthStore } from "../../store/useAuthStore.js";

export function CommentCard({ comment }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(comment.hasUpvoted || false);
  const [isVoting, setIsVoting] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setUpvotes(comment.upvotes || 0);
    setHasUpvoted(comment.hasUpvoted || false);
  }, [comment.upvotes, comment.hasUpvoted]);

  const anonymousName = comment.anonymousUsername || "Anonymous Peer";

  const handleUpvote = async () => {
    if (!user) {
      alert("Please sign in to like comments.");
      return;
    }
    if (isVoting) return;

    setIsVoting(true);
    const prevUpvotes = upvotes;
    const prevHasUpvoted = hasUpvoted;

    // Optimistic update
    const nextHasUpvoted = !prevHasUpvoted;
    setHasUpvoted(nextHasUpvoted);
    setUpvotes(nextHasUpvoted ? prevUpvotes + 1 : Math.max(0, prevUpvotes - 1));

    try {
      const res = await axios.post(`/comments/${comment.id}/like`);
      if (res?.data) {
        setUpvotes(res.data.upvotes);
        setHasUpvoted(res.data.hasUpvoted);
      }
    } catch {
      // Revert optimistic update on failure
      setUpvotes(prevUpvotes);
      setHasUpvoted(prevHasUpvoted);
    } finally {
      setIsVoting(false);
    }
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "Just now";
    const now = new Date();
    const date = new Date(dateStr);
    const diffMin = Math.floor((now - date) / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl glass-panel border border-slate-200/90 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-slate-700/80 transition-all animate-fade-in group">
      
      {/* Geometric Avatar */}
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarGradient(anonymousName)} flex items-center justify-center font-bold text-white text-[11px] shrink-0 border border-white/20 shadow-sm mt-0.5`}>
        {getInitials(anonymousName)}
      </div>

      <div className="flex-1 space-y-1.5 min-w-0">
        
        {/* Author Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
              {anonymousName}
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-1.5 py-0.2 bg-emerald-500/10 rounded border border-emerald-500/20">
              Verified Student
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
            <Clock size={10} />
            <span>{timeAgo(comment.createdAt)}</span>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Comment Action Bar */}
        <div className="pt-1 flex items-center gap-3">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              hasUpvoted ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            <ThumbsUp size={12} className={hasUpvoted ? "fill-emerald-500" : ""} />
            <span>{upvotes > 0 ? upvotes : "Helpful"}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
