import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, MessageSquare, Lock } from "lucide-react";
import axios from "../api/axios.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { PostCard } from "../components/ui/PostCard.jsx";
import { CommentCard } from "../components/ui/CommentCard.jsx";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { getAvatarGradient, getInitials } from "../utils/avatar.js";

export function PostDetails() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetailedPost = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`/posts/${id}`),
          axios.get(`/comments/post/${id}`)
        ]);
        setPost(postRes.data);
        setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
      } catch (err) {
        setError(err.response?.data?.message || 'Whisper not found in database or server is unreachable.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetailedPost();
    }
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!user) {
      setError('You must be signed in to add comments.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/comments', { 
        postId: parseInt(id, 10), 
        content: newComment.trim() 
      });
      if (response?.data) {
        setComments((prev) => [...prev, response.data]);
        setNewComment('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit comment to the database.');
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
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <ErrorMessage message={error || 'Whisper could not be found in the database.'} />
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
    <div className="w-full py-6 space-y-6 animate-fade-in">
      
      {/* Back Navigation Bar */}
      <div>
        <Link 
          to="/feed" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold px-3 py-1.5 rounded-xl glass-panel border border-white/10 shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Feed</span>
        </Link>
      </div>

      {/* Main Post Card from Database */}
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
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${getAvatarGradient(user?.username || 'Student')} flex items-center justify-center font-bold text-white text-[11px] shrink-0 border border-white/20 mt-1`}>
              {getInitials(user?.username || 'Student')}
            </div>

            <div className="flex-1 space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={user ? "Write an anonymous reply..." : "Sign in to add an anonymous reply..."}
                rows={3}
                disabled={!user}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none transition-colors disabled:opacity-60"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {user ? "Encrypted and detached pseudonym" : "Sign in required to participate"}
                </span>

                {user ? (
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
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 text-xs font-bold transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Comment Stream from Database */}
        <div className="space-y-3 pt-2">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 italic">
              No replies yet. Be the first to join this discussion.
            </div>
          ) : (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )}
        </div>

      </div>

    </div>
  );
}
