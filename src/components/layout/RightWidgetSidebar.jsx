import { Link } from "react-router-dom";
import { TrendingUp, ShieldAlert, CheckCircle2, Users, ArrowUpRight } from "lucide-react";
import { usePostStore } from "../../store/usePostStore.js";

const TRENDING_TOPICS = [
  { tag: "PlacementDrive", category: "placement" },
  { tag: "DistributedSystemsExam", category: "academics" },
  { tag: "AnnualHackathon2026", category: "events" },
  { tag: "LibraryQuietZones", category: "general" },
  { tag: "HostelMessCommittee", category: "confessions" },
];

export function RightWidgetSidebar() {
  const { setSearchQuery, setActiveFilter } = usePostStore();

  const handleTopicClick = (topic) => {
    setActiveFilter(topic.category);
    setSearchQuery(topic.tag);
  };

  return (
    <aside className="hidden xl:flex flex-col w-72 fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-20 bottom-6 space-y-4 overflow-y-auto pr-1 select-none">
      
      {/* Live Campus Activity Status */}
      <div className="p-4 rounded-2xl glass-panel flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
            <Users size={18} />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Campus Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Database connected live</p>
          </div>
        </div>
      </div>

      {/* Trending Campus Topics */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <TrendingUp size={16} className="text-indigo-500" />
            <span>Campus Channels</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Live</span>
        </div>

        <div className="space-y-1.5">
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic.tag}
              onClick={() => handleTopicClick(topic)}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-semibold group-hover:text-indigo-500 transition-colors">
                  #{topic.tag}
                </span>
                <p className="text-[10px] text-slate-400 capitalize">{topic.category}</p>
              </div>
              <ArrowUpRight size={13} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Confidential Safe Report Promo */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/20 glass-panel space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-500">Confidential Safe Report</h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Direct institutional escalation</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          Report harassment, safety concerns, or academic misconduct. Submissions route to university compliance without revealing identity.
        </p>
        <Link
          to="/report"
          className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-sm"
        >
          Submit Confidential Report
        </Link>
      </div>

      {/* Campus Code of Ethics */}
      <div className="p-4 rounded-2xl glass-panel space-y-2.5 text-[11px] text-slate-500 dark:text-slate-400">
        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block">
          Community Code
        </span>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Zero tolerance for harassment or doxxing.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Constructive advice and transparent peer reviews.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Cryptographic decoupling on all whispers.</span>
        </div>
      </div>

    </aside>
  );
}
