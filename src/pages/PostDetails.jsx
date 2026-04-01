import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import axios from "../api/axios.js";
import { PostCard } from "../components/ui/PostCard.jsx";
import { CommentCard } from "../components/ui/CommentCard.jsx";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";

export function PostDetails() {
  const { id } = useParams();
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
        setComments(commentsRes.data);
      } catch (err) {
         setError(err.response?.data?.message || 'Failed to load whisper details');
      } finally {
         setIsLoading(false);
      }
    };
    fetchDetailedPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post('/comments', { postId: id, content: newComment });
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="mt-20"><Loader size={40} /></div>;
  if (error || !post) return <div className="mt-20 text-center"><ErrorMessage message={error || 'Post not found'} /></div>;

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 sm:pb-8">
      <Link to="/feed" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium text-sm border border-slate-700/50 bg-slate-900/50 rounded-full pl-3 pr-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/50">
        <ArrowLeft size={16} /> Back to feed
      </Link>

      <PostCard post={post} />

      <div className="mt-8 space-y-6 bg-surface/50 border border-border/80 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-200 border-b border-border/50 pb-3">
          Comments ({comments.length})
        </h3>

        <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add an anonymous comment..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/50 transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="flex items-center justify-center sm:w-auto gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader size={16} /> : <><Send size={16} className="shrink-0" /><span className="sm:hidden">Send</span></>}
          </button>
        </form>

        <div className="space-y-3 pt-3">
          {comments.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4 italic">No comments yet. Be the first...</p>
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
