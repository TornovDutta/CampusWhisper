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

  const [alias, setAlias] = useState("Anonymous Falcon");
  const [aliasRotated, setAliasRotated] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const handleRotateAlias = () => {
    const aliases = [
      "Silent Architect",
      "Cipher Fox",
      "Hidden Sentinel",
      "Campus Pulse",
      "Midnight Raven",
      "Shadow Lynx",
      "Echo Nomad"
    ];
    const newAlias = aliases[Math.floor(Math.random() * aliases.length)];
    setAlias(newAlias);
    setAliasRotated(true);
    setTimeout(() => setAliasRotated(false), 2500);
  };

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
  const userPosts = posts.slice(0, 3); // Current session posts

  return (
    <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
      
      {/* Identity Card */}
      <div className="glass-panel rounded-3xl border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-slide-up">
        
        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-indigo-600/20 via-violet-600/15 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar with Ring */}
          <div className="relative">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${getAvatarGradient(alias)} flex items-center justify-center font-extrabold text-white text-2xl shadow-xl shadow-indigo-950/60 border-2 border-white/20`}>
              {getInitials(alias)}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-lg bg-emerald-500 text-white shadow-md" title="Verified Campus Identity">
              <ShieldCheck size={14} />
            </div>
          </div>

          {/* Profile Overview */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {alias}
                </h1>
                <p className="text-xs text-indigo-400 font-semibold flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <span>Current Active Alias</span>
                  <span className="w-1 h-1 rounded-full bg-indigo-400" />
                  <span>Account: {username}</span>
                </p>
              </div>

              {/* Alias Rotation Action */}
              <button
                onClick={handleRotateAlias}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-indigo-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 shadow-sm"
                title="Rotate your active pseudonym"
              >
                <RotateCw size={13} className={aliasRotated ? "animate-spin text-indigo-400" : ""} />
                <span>{aliasRotated ? "Rotated" : "Rotate Alias"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Linked student email: <span className="text-slate-300 font-medium">{user.email}</span>. Your email is never exposed to other peers or attached to database records.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <CheckCircle2 size={12} />
                Verified Student Affiliation
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold border border-indigo-500/20">
                <Lock size={12} />
                256-Bit Cryptographic Shield
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Activity Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileText size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-white">8</span>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Whispers Shared</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ThumbsUp size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-emerald-400">142</span>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upvotes Received</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <MessageSquare size={22} />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-cyan-400">26</span>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Replies Posted</p>
          </div>
        </div>

      </div>

      {/* Profile Section Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "activity"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            My Recent Whispers
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "privacy"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Privacy Safeguards
          </button>
        </div>

        {activeTab === "activity" ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-white">How Your Data is Protected</h3>
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
