import { useState } from "react";
import { ThumbsUp, Clock, ShieldCheck } from "lucide-react";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";

export function CommentCard({ comment }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const anonymousName = comment.anonymousUsername || "Anonymous Peer";

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((v) => Math.max(0, v - 1));
      setHasUpvoted(false);
    } else {
      setUpvotes((v) => v + 1);
      setHasUpvoted(true);
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
    <div className="flex items-start gap-3 p-4 rounded-xl glass-panel border border-white/[0.06] hover:border-slate-700/80 transition-all animate-fade-in group">
      
      {/* Geometric Avatar */}
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarGradient(anonymousName)} flex items-center justify-center font-bold text-white text-[11px] shrink-0 border border-white/20 shadow-sm mt-0.5`}>
        {getInitials(anonymousName)}
      </div>

      <div className="flex-1 space-y-1.5 min-w-0">
        
        {/* Author Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
              {anonymousName}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold px-1 py-0.2 bg-emerald-500/10 rounded border border-emerald-500/20">
              Verified Student
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Clock size={10} />
            <span>{timeAgo(comment.createdAt)}</span>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Comment Action Bar */}
        <div className="pt-1 flex items-center gap-3">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              hasUpvoted ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <ThumbsUp size={12} className={hasUpvoted ? "fill-emerald-400" : ""} />
            <span>{upvotes > 0 ? upvotes : "Helpful"}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
