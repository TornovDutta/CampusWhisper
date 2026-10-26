import { useState } from "react";
import { PenSquare, Sparkles, Send, Lock, Briefcase, BookOpen, Calendar, MessageSquare, Compass } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { usePostStore } from "../../store/usePostStore.js";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";
import { Loader } from "./Loader.jsx";
import { cn } from "../../utils/cn.js";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: "placement", label: "Placement", icon: Briefcase },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "events", label: "Events", icon: Calendar },
  { id: "confessions", label: "Confessions", icon: MessageSquare },
  { id: "general", label: "General", icon: Compass },
];

export function InlineFeedComposer() {
  const user = useAuthStore((state) => state.user);
  const { createPost, isLoading } = usePostStore();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login?mode=login");
      return;
    }
    if (!content.trim()) return;

    const success = await createPost({ content: content.trim(), category });
    if (success) {
      setContent("");
      setIsFocused(false);
    }
  };

  const username = user?.username || "Student";

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-white/[0.08] shadow-lg transition-all animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start gap-3">
          {/* User / Anonymous Avatar */}
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${getAvatarGradient(username)} flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md border border-white/20 mt-1`}>
            {getInitials(username)}
          </div>

          <div className="flex-1 space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Share an anonymous whisper to campus..."
              rows={isFocused ? 3 : 2}
              className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none transition-all leading-relaxed"
            />

            {/* Expanded Controls when focused or text is typed */}
            {(isFocused || content.length > 0) && (
              <div className="space-y-3 pt-1 animate-slide-down">
                
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
                    Channel:
                  </span>
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border",
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                            : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                      >
                        <Icon size={12} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <Lock size={12} />
                    <span>Anonymous & 256-bit hashed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setContent("");
                        setIsFocused(false);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !content.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 active:scale-95"
                    >
                      {isLoading ? <Loader size={14} className="text-white" /> : (
                        <>
                          <Send size={13} />
                          <span>Whisper</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
