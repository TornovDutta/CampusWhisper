import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, MessageSquare, Lock, Sparkles } from "lucide-react";
import axios from "../api/axios.js";
import { usePostStore } from "../store/usePostStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { PostCard } from "../components/ui/PostCard.jsx";
import { CommentCard } from "../components/ui/CommentCard.jsx";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { getAvatarGradient, getInitials } from "../utils/avatar.js";

// Fallback comments if backend is offline
const INITIAL_DEMO_COMMENTS = {
  "post-101": [
    {
      id: "comm-1",
      anonymousUsername: "Silent Owl",
      content: "Can confirm for Google round 1 - make sure you know topological sort and trie optimizations as well.",
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      upvotes: 8,
    },
    {
      id: "comm-2",
      anonymousUsername: "Echo Nomad",
      content: "Does anyone know if shortlisted candidates get emailed directly or through the placement cell portal?",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      upvotes: 3,
    }
  ],
  "post-102": [
    {
      id: "comm-3",
      anonymousUsername: "Campus Scholar",
      content: "That relative grading curve saves so many people. The midterm was definitely harder than past papers.",
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      upvotes: 5,
    }
  ]
};

export function PostDetails() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const storePosts = usePostStore((state) => state.posts);
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetailedPost = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`/posts/${id}`),
          axios.get(`/comments/post/${id}`)
        ]);
        setPost(postRes.data);
        setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
      } catch (err) {
        // Fallback to store posts if backend is offline
        const matched = storePosts.find((p) => String(p.id) === String(id));
        if (matched) {
          setPost(matched);
          setComments(INITIAL_DEMO_COMMENTS[id] || [
            {
              id: "comm-auto-1",
              anonymousUsername: "Silent Peer",
              content: "Thanks for sharing this update on campus. Very helpful information for our batch.",
              createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
              upvotes: 4,
            }
          ]);
        } else {
          setError('Whisper not found or has expired.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailedPost();
  }, [id, storePosts]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    const generatedAlias = "Anonymous " + ["Owl", "Badger", "Puma", "Falcon", "Lynx"][Math.floor(Math.random() * 5)];
    const localComment = {
      id: `comm-${Date.now()}`,
      anonymousUsername: generatedAlias,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
    };

    try {
      const response = await axios.post('/comments', { postId: id, content: newComment });
      setComments((prev) => [...prev, response.data || localComment]);
      setNewComment('');
    } catch (err) {
      // Offline fallback: optimistically append local comment
      setComments((prev) => [...prev, localComment]);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader size={36} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-16 text-center space-y-4">
        <ErrorMessage message={error || 'Whisper could not be located.'} />
        <Link 
          to="/feed" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Live Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-6 space-y-6">
      
      {/* Back Navigation Bar */}
      <div>
        <Link 
          to="/feed" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Feed</span>
        </Link>
      </div>

      {/* Main Post Card */}
      <PostCard post={post} isDetail={true} />

      {/* Comments Thread Section */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-lg space-y-5 animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 font-bold text-white text-sm sm:text-base">
            <MessageSquare size={17} className="text-indigo-400" />
            <span>Discussion Thread ({comments.length})</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Lock size={12} />
            <span>Anonymous Replies</span>
          </div>
        </div>

        {/* Comment Composer */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarGradient(user?.username || 'Guest')} flex items-center justify-center font-bold text-white text-[11px] shrink-0 border border-white/20 mt-1`}>
              {getInitials(user?.username || 'Peer')}
            </div>

            <div className="flex-1 space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write an anonymous response..."
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none transition-colors"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Published with detached pseudonym
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader size={14} className="text-white" />
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Post Reply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comment Stream */}
        <div className="space-y-3 pt-2">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 italic">
              No replies yet. Be the first to join this discussion.
            </div>
          ) : (
            comments.map((comment, i) => (
              <CommentCard key={comment.id || i} comment={comment} />
            ))
          )}
        </div>

      </div>

    </div>
  );
}
