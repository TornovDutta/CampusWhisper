import { useEffect, useState } from "react";
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Activity, 
  RotateCw, 
  LogOut, 
  MessageSquare, 
  ThumbsUp, 
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { usePostStore } from "../store/usePostStore.js";
import { Loader } from "../components/ui/Loader.jsx";
import { PostCard } from "../components/ui/PostCard.jsx";
import { getAvatarGradient, getInitials } from "../utils/avatar.js";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const { user, fetchMe, isLoading, logout } = useAuthStore();
  const posts = usePostStore((state) => state.posts);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("activity");

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading || !user) {
    return (
      <div className="py-24 flex justify-center">
        <Loader size={36} />
      </div>
    );
  }

  const username = user.username || "Verified Peer";

  return (
    <div className="w-full max-w-3xl mx-auto py-6 space-y-6 animate-fade-in">
      
      {/* Identity Card */}
      <div className="glass-panel rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-xl">
        
        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-indigo-600/20 via-violet-600/15 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar with Ring */}
          <div className="relative">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${getAvatarGradient(username)} flex items-center justify-center font-extrabold text-white text-2xl shadow-xl shadow-indigo-950/60 border-2 border-white/20`}>
              {getInitials(username)}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-lg bg-emerald-500 text-white shadow-md" title="Verified Campus Identity">
              <ShieldCheck size={14} />
            </div>
          </div>

          {/* Profile Overview */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  {username}
                </h1>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <span>Verified Student Member</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              Registered email: <span className="font-semibold text-slate-900 dark:text-slate-200">{user.email}</span>. Your student email is decoupled from published whispers.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <CheckCircle2 size={12} />
                Database Verified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-500/20">
                <Lock size={12} />
                256-Bit Cryptographic Shield
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Profile Section Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "activity"
                ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Live Database Feed
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "privacy"
                ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Privacy Safeguards
          </button>
        </div>

        {activeTab === "activity" ? (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center space-y-2 text-slate-600 dark:text-slate-400 border border-slate-200/90 dark:border-white/[0.06]">
                <p className="text-sm font-semibold">No whispers in the database yet.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Publish your first anonymous whisper from the feed.</p>
              </div>
            ) : (
              posts.slice(0, 5).map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">How Your Data is Protected</h3>
            <p>
              1. <strong>Database Decoupling:</strong> Your account record is kept in a distinct authentication collection that never maintains relational links to whisper objects.
            </p>
            <p>
              2. <strong>One-Way Signatures:</strong> Each time you publish a whisper or reply, a random ephemeral alias is chosen for that specific session.
            </p>
            <p>
              3. <strong>Immediate Revocation:</strong> You can sign out or clear your cached tokens at any moment.
            </p>
          </div>
        )}
      </div>

      {/* Sign Out Button */}
      <div className="pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs sm:text-sm border border-rose-500/20 transition-all active:scale-98"
        >
          <LogOut size={16} />
          <span>Sign Out from Campus Session</span>
        </button>
      </div>

    </div>
  );
}
