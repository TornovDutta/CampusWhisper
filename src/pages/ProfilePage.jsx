import { useEffect, useState } from "react";
import { User, Activity, AlertTriangle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "../components/ui/Loader.jsx";
import axios from "../api/axios.js";

export function ProfilePage() {
  const { user, fetchMe, isLoading, logout } = useAuthStore();
  const [stats, setStats] = useState({ postsCount: 0, commentsCount: 0 });

  useEffect(() => {
    fetchMe();
    // Simulate fetching user statistics if API doesn't provide it
    const fetchStats = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          axios.get('/posts?mine=true').catch(() => ({ data: [] })),
          axios.get('/comments?mine=true').catch(() => ({ data: [] }))
        ]);
        setStats({
          postsCount: postsRes.data.length || 0,
          commentsCount: commentsRes.data.length || 0
        });
      } catch {
        // Safe to ignore for profile stats
      }
    };
    fetchStats();
  }, [fetchMe]);

  if (isLoading || !user) {
    return <div className="mt-20 flex justify-center"><Loader size={40} /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 relative">
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm overflow-hidden relative">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-surface shadow-lg flex items-center justify-center mb-4 mt-6">
            <User size={40} className="text-primary" />
          </div>
          
          <h1 className="text-2xl font-extrabold text-slate-100">{user.username || 'Anonymous User'}</h1>
          <p className="text-slate-400 text-sm mt-1">{user.email}</p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4 w-full border-t border-border pt-6">
            <div className="flex-1 min-w-[120px] bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
               <Activity size={20} className="text-blue-400 mb-2" />
               <span className="text-2xl font-bold text-white">{stats.postsCount}</span>
               <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Whispers</span>
            </div>
            <div className="flex-1 min-w-[120px] bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
               <AlertTriangle size={20} className="text-orange-400 mb-2" />
               <span className="text-2xl font-bold text-white">{stats.commentsCount}</span>
               <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Comments</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full mt-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-colors border border-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
