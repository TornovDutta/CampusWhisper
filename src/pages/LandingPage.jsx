import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
  Users,
  BookOpen,
  Calendar,
  Building,
  HelpCircle,
  ChevronDown,
  Layers,
  EyeOff,
  Scale
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const FAQS = [
  {
    q: "Can my university administration or professors trace my whispers?",
    a: "No. CampusWhisper enforces strict one-way cryptographic decoupling. While your student email verifies that you are an actively enrolled peer during account registration, all posts, comments, and votes are stored with detached pseudonyms. No IP addresses or device fingerprints are saved with whisper payloads."
  },
  {
    q: "How does the platform ensure only real campus students participate?",
    a: "Registration requires verification through valid university domain credentials (@university.edu). This effectively blocks external trolls, spammers, and non-student actors while keeping student identities completely isolated from published content."
  },
  {
    q: "How does the Confidential Safe Report portal work?",
    a: "If you witness serious misconduct, safety hazards, harassment, or academic dishonesty, you can submit an encrypted report. The system generates an anonymous tracking reference code (e.g. CW-SAFE-8942-X7) that routes directly to university oversight without ever linking to your student profile."
  },
  {
    q: "Are my anonymous aliases permanent or rotating?",
    a: "Aliases rotate automatically to prevent cross-correlation across different channels. An alias used in the Placements channel cannot be linked to thoughts shared in Confessions or Academics."
  },
  {
    q: "How are harmful or abusive posts moderated?",
    a: "CampusWhisper uses community-driven peer flag reviews combined with algorithmic content filtering. Posts exceeding the report threshold are immediately placed in quarantined hold pending moderator review."
  }
];

export function LandingPage() {
  const user = useAuthStore((state) => state.user);
  const [mockUpvoted, setMockUpvoted] = useState(false);
  const [mockVotes, setMockVotes] = useState(148);
  const [openFaq, setOpenFaq] = useState(0);

  if (user) {
    return <Navigate to="/feed" replace />;
  }

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
    <div className="relative min-h-screen overflow-hidden bg-background text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-10%] w-[550px] h-[550px] bg-emerald-600/10 blur-[160px] pointer-events-none" />

      {/* Subtle Matrix Dot Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 space-y-24">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO HEADER */}
        {/* ========================================================================= */}
        <section className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-600 dark:text-indigo-300 shadow-md animate-scale-in">
            <Lock size={13} className="text-indigo-500" />
            <span>Zero-Trace Cryptographic Anonymity</span>
            <span className="w-1 h-1 rounded-full bg-indigo-500" />
            <span className="text-slate-500 dark:text-slate-400">Verified Peer Network</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
              The Authentic, Unfiltered <br />
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Voice of Your Campus.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              CampusWhisper is the verified platform for university students. Discuss placement rounds, course grading curves, campus life, and confessions with complete identity decoupling and zero digital footprint.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
            <Link
              to="/feed"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/25 border border-indigo-400/30 transition-all hover:scale-102 active:scale-98 text-sm"
            >
              <span>Explore Live Feed</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/login?mode=signup"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-7 py-3.5 rounded-xl transition-all text-sm border border-slate-300 dark:border-slate-700"
            >
              <span>Join with .EDU Email</span>
            </Link>
          </div>

          {/* Live Interactive Preview Card */}
          <div className="w-full max-w-2xl pt-6 animate-slide-up">
            <div className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 text-left space-y-4 shadow-xl relative">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-xs border border-white/20 shadow-md">
                    AF
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Anonymous Falcon</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        Verified Senior
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <Clock size={11} />
                      <span>18 minutes ago</span>
                    </div>
                  </div>
                </div>

                <span className="badge-pill bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                  <Briefcase size={12} />
                  <span>Placement 2026</span>
                </span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
                Google and Microsoft campus drive shortlists just dropped for final year engineering. The OA focused heavily on dynamic programming, topological sorting, and SQL optimizations. Prepare system design fundamentals thoroughly for technical rounds.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/[0.06] text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMockUpvote}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      mockUpvoted 
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30" 
                        : "bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-emerald-600"
                    }`}
                  >
                    <ThumbsUp size={14} className={mockUpvoted ? "fill-emerald-500 dark:fill-emerald-400" : ""} />
                    <span>{mockVotes}</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <MessageSquare size={14} />
                    <span>32 comments</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Cryptographically verified</span>
                </div>
              </div>

            </div>
          </div>

          {/* Metric Highlights Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-4">
            <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-4 rounded-2xl text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">100%</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">Zero IP Logs</p>
            </div>
            <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-4 rounded-2xl text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">256-Bit</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">SHA Shield</p>
            </div>
            <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-4 rounded-2xl text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">Ephemeral</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">Alias Rotation</p>
            </div>
            <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-4 rounded-2xl text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">Direct</span>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1 uppercase tracking-wider">Safe Escalation</p>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: CAMPUS CHANNELS GRID */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Specialized Campus Channels
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Structured discussion spaces tailored to every facet of student life and career milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Briefcase size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Placements & Career</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Online assessment formats, interview question banks, salary transparency, and internship guidance shared by senior students.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <BookOpen size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Academics & Grading Curves</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Objective professor course reviews, syllabus breakdowns, midterm relative curves, and past question repositories.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Calendar size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Campus Events & Hackathons</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Teammate recruitment for hackathons, club announcements, technical symposiums, and cultural festivals.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Unfiltered Thoughts</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A safe, non-judgmental space to vent about burnout, academic pressure, career anxiety, or seek anonymous advice from peers.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Building size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Campus Infrastructure</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Library study pod availability, campus Wi-Fi performance, lab equipment updates, and hostel facility feedback.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border border-slate-200/80 dark:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Confidential Safe Report</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct escalation channel for harassment, academic dishonesty, and safety hazards straight to university compliance officers.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: HOW ANONYMITY WORKS (CRYPTOGRAPHIC PIPELINE) */}
        {/* ========================================================================= */}
        <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-white/10 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Cryptographic Data Decoupling
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              How CampusWhisper protects student privacy through architectural separation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Institutional Handshake</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Students authenticate using institutional email credentials. This guarantees every participant is a verified student without storing email records alongside user content.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white font-extrabold flex items-center justify-center shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">One-Way Decoupling</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When whispers or comments are persisted, the user ID is stripped. The content record is detached from user account tables using one-way cryptographic tokens.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Ephemeral Alias Assignment</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Each whisper is issued an ephemeral persona (e.g. "Silent Architect", "Cipher Fox") that rotates across sessions, preventing behavioral profiling across channels.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: INSTITUTIONAL SAFE REPORTING SPOTLIGHT */}
        {/* ========================================================================= */}
        <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-rose-500/20 bg-gradient-to-br from-rose-500/10 dark:from-rose-950/20 via-surface to-surface flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 shadow-lg shadow-rose-950/30">
            <ShieldAlert size={40} />
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
              <Scale size={13} />
              <span>Campus Ethics & Welfare Compliance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Confidential Whistleblower & Safety System
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Anonymity should never enable harassment. CampusWhisper includes a dedicated institutional escalation module for serious incidents like academic dishonesty, bullying, and facility hazards. Each submission generates an encrypted tracking token (<code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-rose-600 dark:text-rose-400 text-xs font-mono border border-slate-300 dark:border-slate-800">CW-SAFE-XXXX-XXX</code>) allowing tracking without identity disclosure.
            </p>
            <div className="pt-2">
              <Link
                to="/report"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/30 active:scale-95"
              >
                <span>Access Safe Report Portal</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
        {/* ========================================================================= */}
        <section className="space-y-8 max-w-3xl mx-auto w-full">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Understanding cryptographic security and student protection on CampusWhisper.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="glass-panel rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-180 text-indigo-500" : "text-slate-400"}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/[0.06] animate-slide-down">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: BOTTOM CALL TO ACTION */}
        {/* ========================================================================= */}
        <section className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-200/80 dark:border-white/10 text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-indigo-500/10 dark:from-indigo-950/40 via-surface to-violet-500/10 dark:to-violet-950/40">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Ready to Speak Freely?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Join thousands of peers in the verified student network. Share advice, read placement breakdowns, and protect your identity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/login?mode=signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-102 active:scale-98"
            >
              Register with University Email
            </Link>
            <Link
              to="/feed"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all border border-slate-300 dark:border-slate-700"
            >
              Browse Public Feed
            </Link>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 7: PROFESSIONAL FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-950/80 py-12 px-4 sm:px-6 relative z-10 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck size={16} />
            </div>
            <span>CampusWhisper Network</span>
            <span>—</span>
            <span className="font-normal text-slate-500">Encrypted Student Voice</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-400 font-medium">
            <Link to="/feed" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Live Feed</Link>
            <Link to="/categories" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Channels</Link>
            <Link to="/report" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Safe Report</Link>
            <Link to="/login" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
