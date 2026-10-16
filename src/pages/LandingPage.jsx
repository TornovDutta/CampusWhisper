import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  ShieldAlert, 
  Briefcase, 
  ThumbsUp, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Users
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export function LandingPage() {
  const user = useAuthStore((state) => state.user);
  const demoLogin = useAuthStore((state) => state.demoLogin);
  const navigate = useNavigate();
  const [mockUpvoted, setMockUpvoted] = useState(false);
  const [mockVotes, setMockVotes] = useState(148);

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  const handleDemoStart = () => {
    demoLogin();
    navigate("/feed");
  };

  const handleMockUpvote = () => {
    if (mockUpvoted) {
      setMockVotes((v) => v - 1);
      setMockUpvoted(false);
    } else {
      setMockVotes((v) => v + 1);
      setMockUpvoted(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-slate-100 flex flex-col justify-between">
      
      {/* Ambient Radial Glowing Elements */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] pointer-events-none" />

      {/* Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 flex flex-col items-center text-center space-y-12">
        
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-950/50 animate-fade-in">
          <Lock size={13} className="text-indigo-400" />
          <span>Zero-Trace Cryptographic Anonymity</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-slate-400">Verified Peer Network</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-6 max-w-4xl animate-slide-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Speak Your Truth. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Protect Your Identity.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            CampusWhisper is the verified anonymous platform for college students. Discuss placement rounds, course grading curves, campus events, and candid advice without personal bias or digital footprint.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md animate-slide-up">
          <button
            onClick={handleDemoStart}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-102 active:scale-98 text-sm"
          >
            <Sparkles size={16} />
            <span>Instant Demo Access</span>
            <ArrowRight size={15} />
          </button>

          <Link
            to="/feed"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700/80 transition-all text-sm hover:border-slate-600"
          >
            <span>Explore Live Feed</span>
          </Link>
        </div>

        {/* Live Interactive Mockup Card Preview */}
        <div className="w-full max-w-2xl pt-4 animate-scale-in">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl text-left space-y-4 relative group">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-xs border border-white/20 shadow-md">
                  AF
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">Anonymous Falcon</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      Verified Senior
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <Clock size={11} />
                    <span>24 minutes ago</span>
                  </div>
                </div>
              </div>

              <span className="badge-pill bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <Briefcase size={12} />
                <span>Placement 2026</span>
              </span>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Google OA results just sent out for SDE-1 campus roles. Key questions touched on binary indexed trees, dynamic programming on trees, and LRU cache implementations. System design rounds start on Tuesday.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMockUpvote}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    mockUpvoted 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                      : "bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-emerald-400"
                  }`}
                >
                  <ThumbsUp size={14} className={mockUpvoted ? "fill-emerald-400" : ""} />
                  <span>{mockVotes}</span>
                </button>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                  <MessageSquare size={14} />
                  <span>28 comments</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-indigo-400">
                <CheckCircle2 size={13} />
                <span>Encrypted transmission</span>
              </div>
            </div>

          </div>
        </div>

        {/* Key Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6">
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.06] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">100%</span>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Zero IP Logs</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.06] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">256-Bit</span>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Hash Shield</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.06] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">7-Day</span>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Alias Rotation</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.06] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">24/7</span>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Safe Escalation</p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="w-full pt-12 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Built Specifically for Campus Realities
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Engineered with four structural safeguards to guarantee constructive and strictly anonymous student conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Feature 1 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Lock size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Cryptographic Anonymity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Posts are disconnected from your user account using one-way cryptographic tokens. Neither peers nor moderators can trace a whisper back to an author.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Peer-Curated Hot Topics</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                High-impact whispers voted up by peers surface immediately. Accurate updates regarding exam shifts, interviews, and events gain rapid visibility.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-base font-bold text-white">Confidential Safe Report</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Emergency escalation module for serious infractions like harassment, academic dishonesty, or campus safety. Reports route directly to university compliance.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Professional Footer */}
      <footer className="border-t border-white/[0.08] bg-slate-950/80 py-8 px-4 sm:px-6 relative z-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <ShieldCheck size={16} className="text-indigo-400" />
            <span>CampusWhisper Platform</span>
            <span>—</span>
            <span>Designed for Student Transparency</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/feed" className="hover:text-white transition-colors">Feed</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Channels</Link>
            <Link to="/report" className="hover:text-white transition-colors">Safe Report</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
