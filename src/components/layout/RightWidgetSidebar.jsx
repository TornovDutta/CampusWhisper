import { Link } from "react-router-dom";
import { TrendingUp, ShieldAlert, CheckCircle2, Users, ArrowUpRight } from "lucide-react";
import { usePostStore } from "../../store/usePostStore.js";

const TRENDING_TOPICS = [
  { tag: "PlacementDrive", count: 142, category: "placement" },
  { tag: "DistributedSystemsExam", count: 96, category: "academics" },
  { tag: "AnnualHackathon2026", count: 83, category: "events" },
  { tag: "LibraryQuietZones", count: 57, category: "general" },
  { tag: "HostelMessCommittee", count: 42, category: "confessions" },
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
      <div className="p-4 rounded-2xl bg-surface/70 border border-white/[0.06] backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>348 Active Peers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">Across 6 university channels</p>
          </div>
        </div>
      </div>

      {/* Trending Campus Topics */}
      <div className="p-4 rounded-2xl bg-surface/70 border border-white/[0.06] backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <TrendingUp size={16} className="text-indigo-400" />
            <span>Campus Trending</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Live</span>
        </div>

        <div className="space-y-2">
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic.tag}
              onClick={() => handleTopicClick(topic)}
              className="w-full text-left p-2 rounded-xl hover:bg-slate-800/60 transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-indigo-300 transition-colors">
                  #{topic.tag}
                </span>
                <p className="text-[10px] text-slate-500">{topic.count} whispers</p>
              </div>
              <ArrowUpRight size={13} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Confidential Safe Report Promo */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-surface/80 to-surface border border-rose-900/30 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-300">Confidential Safe Report</h4>
            <span className="text-[10px] text-slate-400">Direct university escalation</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Report harassment, safety concerns, or academic misconduct anonymously. Directly monitored by ethics committee.
        </p>
        <Link
          to="/report"
          className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition-colors"
        >
          Submit Confidential Report
        </Link>
      </div>

      {/* Campus Code of Ethics */}
      <div className="p-4 rounded-2xl bg-surface/70 border border-white/[0.06] backdrop-blur-md space-y-2.5 text-[11px] text-slate-400">
        <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">
          Community Code
        </span>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>Zero tolerance for personal harassment or doxxing.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>Constructive advice & authentic student transparency.</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>Automated pseudonym rotation every 7 days.</span>
        </div>
      </div>

    </aside>
  );
}
