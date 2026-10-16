import { useState, useEffect } from "react";
import { 
  X, 
  Lock, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Compass, 
  Send 
} from "lucide-react";
import { usePostStore } from "../../store/usePostStore.js";
import { Loader } from "../ui/Loader.jsx";
import { cn } from "../../utils/cn.js";

const CATEGORIES = [
  { id: "placement", label: "Placement", icon: Briefcase },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "events", label: "Campus Events", icon: Calendar },
  { id: "confessions", label: "Confessions", icon: MessageSquare },
  { id: "general", label: "General", icon: Compass },
];

const MAX_CHARS = 500;

export function CreatePostModal({ isOpen, onClose }) {
  const { createPost, isLoading } = usePostStore();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [errorLocal, setErrorLocal] = useState('');

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleSubmit(e);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, content, category]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!content.trim()) {
      setErrorLocal('Please write a whisper before submitting.');
      return;
    }
    if (!category) {
      setErrorLocal('Please select a category.');
      return;
    }
    setErrorLocal('');
    const success = await createPost({ content: content.trim(), category });
    if (success) {
      setContent('');
      setCategory('general');
      onClose();
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel border border-slate-300 dark:border-white/10 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-tight">Create Anonymous Whisper</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Published under a rotating pseudonymous alias</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorLocal && (
            <div className="p-3 text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl animate-shake">
              {errorLocal}
            </div>
          )}

          {/* Category Selector Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
              Select Channel
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 scale-102"
                        : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <Icon size={13} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block">
              Whisper Text
            </label>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share unfiltered thoughts, exam tips, placement guidance, or confessions safely..."
                rows={5}
                autoFocus
                className={cn(
                  "w-full bg-slate-50 dark:bg-slate-950/80 border rounded-xl p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none transition-all leading-relaxed",
                  isOverLimit 
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500" 
                    : "border-slate-300 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                )}
              />
              
              {/* Character Counter */}
              <div className="absolute right-3 bottom-3 flex items-center gap-1 text-[11px] font-mono">
                <span className={cn(isOverLimit ? "text-rose-500 font-bold" : "text-slate-400 dark:text-slate-500")}>
                  {charCount}
                </span>
                <span className="text-slate-400">/ {MAX_CHARS}</span>
              </div>
            </div>
          </div>

          {/* Privacy Assurance Banner */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <Lock size={15} className="text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your IP address, user ID, and browser fingerprint are permanently stripped before database persistence.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">Ctrl + Enter</kbd> to publish
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isLoading || !content.trim() || isOverLimit} 
                className="flex items-center justify-center gap-2 min-w-[120px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 active:scale-95"
              >
                {isLoading ? (
                  <Loader size={16} className="text-white" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>Post Whisper</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
