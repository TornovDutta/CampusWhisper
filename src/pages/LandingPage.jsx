import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquareOff, ShieldCheck, Flame, ChevronRight } from "lucide-react";

export function LandingPage() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Content */}
      <div className="text-center w-full max-w-3xl space-y-6 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Speak your mind. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
            Stay completely anonymous.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          CampusWhisper is the exclusive platform for your campus. Share confessions, gossip, career news, and honest thoughts safely.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to="/login?mode=signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-base font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            Join the Whisper
            <ChevronRight size={18} />
          </Link>
          <Link
            to="/login?mode=login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover text-slate-200 border border-slate-700 text-base font-semibold px-8 py-3.5 rounded-full transition-all hover:border-slate-500"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl mt-24 z-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50 backdrop-blur-md space-y-4">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
             <ShieldCheck size={28} className="text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">Total Anonymity</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Your identity is protected. We use advanced masking to ensure your campus persona remains unknown.</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50 backdrop-blur-md space-y-4">
           <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
             <MessageSquareOff size={28} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">Unfiltered Thoughts</h3>
          <p className="text-sm text-slate-400 leading-relaxed">Speak truths, seek advice, or just vent. A safe space designed for students, by students.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50 backdrop-blur-md space-y-4">
           <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-orange-500/20">
             <Flame size={28} className="text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-200">Trending & Hot</h3>
          <p className="text-sm text-slate-400 leading-relaxed">See what everyone is talking about. Upvote the best whispers to the top of the feed.</p>
        </div>
      </div>
    </div>
  );
}
