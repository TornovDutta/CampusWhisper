import { useState } from "react";
import { X } from "lucide-react";
import { usePostStore } from "../../store/usePostStore.js";
import { Loader } from "../ui/Loader.jsx";

export function CreatePostModal({ isOpen, onClose }) {
  const { createPost, isLoading } = usePostStore();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [errorLocal, setErrorLocal] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !category) {
      setErrorLocal('Content and category are required.');
      return;
    }
    setErrorLocal('');
    const success = await createPost({ content, category });
    if (success) {
      setContent('');
      setCategory('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-slate-700 w-full max-w-lg rounded-2xl shadow-xl shadow-black overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-slate-100">Create a Whisper</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {errorLocal && <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">{errorLocal}</div>}

          <div className="space-y-1">
             <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Category</label>
             <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-colors"
              >
                <option value="">Select a category</option>
                <option value="placement">Placement</option>
                <option value="academics">Academics</option>
                <option value="events">Events</option>
                <option value="gossip">Campus Gossip</option>
                <option value="confessions">Confessions</option>
             </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Whisper</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Don't worry, it's completely anonymous."
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
             <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Cancel
             </button>
             <button type="submit" disabled={isLoading} className="flex items-center justify-center min-w-[100px] bg-primary hover:bg-primary-hover text-white rounded-full px-6 py-2 text-sm font-semibold transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
               {isLoading ? <Loader size={18} className="text-white" /> : 'Whisper'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
