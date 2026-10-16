import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, 
  LogOut, 
  User, 
  PenSquare, 
  Bell, 
  ShieldCheck, 
  X,
  Compass
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { usePostStore } from "../../store/usePostStore.js";
import { getAvatarGradient, getInitials } from "../../utils/avatar.js";
import { CreatePostModal } from "../modals/CreatePostModal.jsx";
import { ThemeToggle } from "../ui/ThemeToggle.jsx";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const { searchQuery, setSearchQuery } = usePostStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
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
      <header className="fixed top-0 left-0 right-0 h-16 glass-nav z-50 border-b transition-all">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              to={user ? "/feed" : "/"} 
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/25 border border-indigo-400/30 group-hover:shadow-indigo-500/40 transition-all">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-1">
                  Campus<span className="text-indigo-500 dark:text-indigo-400">Whisper</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 hidden sm:block">
                  Verified Student Voice
                </span>
              </div>
            </Link>
          </div>

          {/* Compact / Sleek Search Bar */}
          <div className="flex items-center relative flex-1 max-w-[170px] sm:max-w-[210px] md:max-w-[250px]">
            <Search size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search whispers..."
              className="w-full h-8 bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-8 pr-7 text-xs placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Light / Dark Mode Toggle Button */}
            <ThemeToggle />

            {/* Feed Quick Link (if on landing page) */}
            {location.pathname === "/" && (
              <Link
                to="/feed"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <Compass size={14} />
                <span>Feed</span>
              </Link>
            )}

            {/* New Whisper Action Button */}
            <button
              onClick={handleNewWhisperClick}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold px-3 py-1.5 sm:py-2 rounded-xl shadow-md shadow-indigo-600/20 border border-indigo-400/20 transition-all hover:scale-102 active:scale-98"
            >
              <PenSquare size={14} />
              <span className="hidden sm:inline">New Whisper</span>
            </button>

            {user ? (
              <>
                {/* Notifications Bell */}
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                  title="Notifications"
                >
                  <Bell size={17} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
                </Link>

                {/* Profile Pill */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 hover:border-indigo-500/40 transition-all"
                >
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${getAvatarGradient(user.username || 'Student')} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                    {getInitials(user.username || 'Student')}
                  </div>
                  <span className="hidden md:block text-xs font-medium max-w-[80px] truncate">
                    {user.username || 'Student'}
                  </span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login?mode=login"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95"
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
