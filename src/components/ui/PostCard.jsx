import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn.js";
import { usePostStore } from "../../store/usePostStore.js";
import { useState } from "react";

export function PostCard({ post }) {
  const { upvotePost, downvotePost } = usePostStore();
  const [voteHandling, setVoteHandling] = useState(false);

  const handleVote = async (type) => {
    if (voteHandling) return;
    setVoteHandling(true);
    if (type === 'up') await upvotePost(post.id);
    if (type === 'down') await downvotePost(post.id);
    setVoteHandling(false);
  };

  return (
    <article className="bg-surface border border-border rounded-xl p-4 sm:p-5 hover:border-slate-600 transition-colors w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 shrink-0 border-2 border-surface" />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-100 text-sm">
              {post.anonymousUsername || 'Anonymous Fox'}
            </span>
            <span className="text-xs text-slate-400">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.category && (
             <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize border border-primary/20">
               {post.category}
             </span>
          )}
          <button className="text-slate-400 hover:text-slate-200 transition-colors p-1" title="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="text-slate-200 text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
        <p>{post.content}</p>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-slate-800/80 rounded-full border border-slate-700 overflow-hidden">
            <button
              onClick={() => handleVote('up')}
              disabled={voteHandling}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-green-400 hover:bg-slate-700/50 transition-colors disabled:opacity-50 text-xs sm:text-sm font-medium"
            >
              <ThumbsUp size={16} />
              <span>{post.upvotes || 0}</span>
            </button>
            <div className="w-px h-4 bg-slate-700" />
            <button
              onClick={() => handleVote('down')}
              disabled={voteHandling}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors disabled:opacity-50 text-xs sm:text-sm font-medium"
            >
              <ThumbsDown size={16} />
              <span>{post.downvotes || 0}</span>
            </button>
          </div>

          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-primary transition-colors text-xs sm:text-sm font-medium rounded-full hover:bg-slate-800/80"
          >
            <MessageSquare size={16} />
            <span>{post.commentCount || 0} Comments</span>
          </Link>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-red-400 transition-colors text-xs font-medium rounded-full hover:bg-red-500/10 active:bg-red-500/20">
          <AlertTriangle size={16} />
          <span className="hidden sm:inline">Report</span>
        </button>
      </div>
    </article>
  );
}
