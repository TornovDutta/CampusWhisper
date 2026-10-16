import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, 
  LogOut, 
  User, 
  PenSquare, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  X,
  Compass
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { usePostStore } from "../../store/usePostStore.js";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";
import { CreatePostModal } from "../modals/CreatePostModal.jsx";

export function Navbar() {
  const { user, logout, demoLogin } = useAuthStore();
  const { searchQuery, setSearchQuery } = usePostStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDemoSignIn = () => {
    demoLogin();
    navigate("/feed");
  };

  const handleNewWhisperClick = () => {
    if (!user) {
      navigate("/login?mode=login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Campus Badge */}
          <div className="flex items-center gap-4 shrink-0">
            <Link 
              to={user ? "/feed" : "/"} 
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30 group-hover:shadow-indigo-500/40 transition-all">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Campus<span className="text-indigo-400">Whisper</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                  Encrypted Student Voice
                </span>
              </div>
            </Link>

            {/* Live Campus indicator pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Campus Live</span>
            </div>
          </div>

          {/* Interactive Search Bar (Global) */}
          <div className="hidden md:flex flex-1 max-w-md relative items-center">
            <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search whispers, courses, placements..."
              className="w-full h-10 bg-slate-900/80 border border-slate-700/60 rounded-xl pl-10 pr-9 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Feed Quick Link (if on landing page) */}
            {location.pathname === "/" && (
              <Link
                to="/feed"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <Compass size={14} />
                Explore Feed
              </Link>
            )}

            {/* New Whisper Action Button */}
            <button
              onClick={handleNewWhisperClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 border border-indigo-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PenSquare size={16} />
              <span className="hidden sm:inline">New Whisper</span>
            </button>

            {user ? (
              <>
                {/* Notifications Bell */}
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-colors"
                  title="Notifications"
                >
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-background" />
                </Link>

                {/* Profile Pill */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${getAvatarGradient(user.username || 'Anonymous')} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}>
                    {getInitials(user.username || 'User')}
                  </div>
                  <span className="hidden lg:block text-xs font-medium text-slate-200 max-w-[100px] truncate">
                    {user.username || 'Anonymous'}
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDemoSignIn}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 text-indigo-300 text-xs font-semibold border border-indigo-500/20 transition-colors"
                  title="Explore with verified student demo session"
                >
                  <Sparkles size={13} className="text-indigo-400" />
                  Instant Demo
                </button>
                <Link
                  to="/login?mode=login"
                  className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="text-xs sm:text-sm font-semibold bg-white text-slate-950 hover:bg-slate-100 px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Post Creation Modal */}
      {isModalOpen && (
        <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
