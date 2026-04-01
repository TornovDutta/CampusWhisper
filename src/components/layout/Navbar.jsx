import { Link, useNavigate } from "react-router-dom";
import { Search, LogOut, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-surface/90 backdrop-blur-md border-b border-border z-50 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          CampusWhisper
        </Link>
        <div className="hidden sm:flex relative items-center opacity-70 focus-within:opacity-100 transition-opacity">
          <Search size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search whispers..."
            className="w-64 h-9 bg-slate-900/50 border border-slate-700/50 rounded-full pl-9 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden sm:block">{user.username || 'Anonymous'}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition-colors p-2"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-full transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
