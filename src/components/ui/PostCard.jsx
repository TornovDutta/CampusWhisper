import { useState } from "react";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  ShieldAlert, 
  Share2, 
  Bookmark, 
  Check, 
  Clock, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn.js";
import { usePostStore } from "../../store/usePostStore.js";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";

const CATEGORY_STYLES = {
  placement: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  academics: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
  events: "bg-purple-500/10 text-purple-400 border-purple-500/25",
  confessions: "bg-rose-500/10 text-rose-400 border-rose-500/25",
  general: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
};

export function PostCard({ post, isDetail = false }) {
  const { upvotePost, downvotePost } = usePostStore();
  const [voteHandling, setVoteHandling] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const handleVote = async (type) => {
    if (voteHandling) return;
    setVoteHandling(true);
    if (type === 'up') await upvotePost(post.id);
    if (type === 'down') await downvotePost(post.id);
    setVoteHandling(false);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/post/${post.id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleReport = (e) => {
    e.stopPropagation();
    setReportSent(true);
    setTimeout(() => setReportSent(false), 3000);
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
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const anonymousName = post.anonymousUsername || "Anonymous Peer";
  const categoryKey = (post.category || "general").toLowerCase();
  const categoryBadgeClass = CATEGORY_STYLES[categoryKey] || CATEGORY_STYLES.general;

  const isLongText = post.content && post.content.length > 280;
  const displayText = !isDetail && isLongText && !isExpanded 
    ? `${post.content.slice(0, 280)}...` 
    : post.content;

  return (
    <article className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 w-full space-y-4 border border-white/[0.08] animate-slide-up transition-all group">
      
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Geometric Abstract Avatar */}
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${getAvatarGradient(anonymousName)} flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0 border border-white/20`}>
            {getInitials(anonymousName)}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-slate-100 text-sm tracking-tight group-hover:text-indigo-300 transition-colors">
                {anonymousName}
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/20">
                Verified Peer
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <Clock size={12} className="text-slate-500" />
              <span>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Category Pill Tag */}
        <div className="flex items-center gap-2">
          {post.category && (
            <span className={cn("badge-pill border capitalize shadow-sm", categoryBadgeClass)}>
              <Sparkles size={11} />
              <span>{post.category}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="text-slate-200 text-sm sm:text-base leading-relaxed break-words font-normal">
        <p className="whitespace-pre-wrap">{displayText}</p>
        
        {isLongText && !isDetail && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 mt-2 flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Show less <ChevronUp size={14} /></>
            ) : (
              <>Read more <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
        
        {/* Left Actions: Upvote / Downvote and Comments */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          
          {/* Segmented Vote Controller */}
          <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-700/60 p-0.5 shadow-inner">
            <button
              onClick={() => handleVote('up')}
              disabled={voteHandling}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all active:scale-95",
                post.hasUpvoted
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
              )}
              title="Upvote whisper"
            >
              <ThumbsUp size={14} className={post.hasUpvoted ? "fill-emerald-400" : ""} />
              <span>{post.upvotes || 0}</span>
            </button>

            <div className="w-px h-4 bg-slate-700 mx-0.5" />

            <button
              onClick={() => handleVote('down')}
              disabled={voteHandling}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all active:scale-95",
                post.hasDownvoted
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "text-slate-400 hover:text-rose-400 hover:bg-slate-800"
              )}
              title="Downvote whisper"
            >
              <ThumbsDown size={14} className={post.hasDownvoted ? "fill-rose-400" : ""} />
              {post.downvotes > 0 && <span>{post.downvotes}</span>}
            </button>
          </div>

          {/* Comment Counter / Link */}
          {!isDetail ? (
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-indigo-400 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors font-medium"
            >
              <MessageSquare size={14} />
              <span>{post.commentCount || 0} comments</span>
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800 font-medium">
              <MessageSquare size={14} />
              <span>{post.commentCount || 0} comments</span>
            </div>
          )}

        </div>

        {/* Right Actions: Share, Bookmark, Report */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Share / Copy link */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-300 hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-colors relative"
            title="Share whisper link"
          >
            {isCopied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
            {isCopied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-emerald-400 border border-emerald-500/30 whitespace-nowrap shadow-lg animate-fade-in">
                Copied
              </span>
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2 rounded-xl border border-transparent transition-colors",
              isBookmarked 
                ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/70"
            )}
            title="Save whisper"
          >
            <Bookmark size={15} className={isBookmarked ? "fill-indigo-400" : ""} />
          </button>

          {/* Report Button */}
          <button
            onClick={handleReport}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors relative"
            title="Report anonymously"
          >
            <ShieldAlert size={15} />
            {reportSent && (
              <span className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-slate-900 text-[10px] text-rose-400 border border-rose-500/30 whitespace-nowrap shadow-lg animate-fade-in">
                Flagged for review
              </span>
            )}
          </button>
        </div>

      </div>

    </article>
  );
}
