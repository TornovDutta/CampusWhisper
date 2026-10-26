import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Bell, 
  ShieldAlert, 
  User, 
  Compass, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Lock, 
  Plus 
} from "lucide-react";
import { cn } from "../../utils/cn.js";
import { usePostStore } from "../../store/usePostStore.js";
import { CreatePostModal } from "../modals/CreatePostModal.jsx";

const mainNavItems = [
  { icon: Home, label: "Live Feed", path: "/feed" },
  { icon: Compass, label: "Explore Channels", path: "/categories" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: ShieldAlert, label: "Safe Report", path: "/report", highlight: true },
  { icon: User, label: "My Identity", path: "/profile" },
];

const categoryChannels = [
  { id: "placement", label: "Placements & Internships", icon: Briefcase },
  { id: "academics", label: "Academics & Exams", icon: BookOpen },
  { id: "events", label: "Campus Events & Hackathons", icon: Calendar },
  { id: "confessions", label: "Unfiltered Thoughts", icon: MessageSquare },
];

export function Sidebar() {
  const location = useLocation();
  const { setActiveFilter, activeFilter } = usePostStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-[max(1rem,calc((100vw-80rem)/2+1rem))] top-20 bottom-6 z-30 select-none">
        <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-2 space-y-6">
          
          {/* Main Navigation Links */}
          <div className="space-y-1 glass-panel rounded-2xl p-2.5 border border-slate-200/80 dark:border-white/[0.08]">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/feed' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group relative",
                    isActive
                      ? "bg-indigo-600/10 dark:bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/25"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon 
                      size={17} 
                      className={cn(
                        "transition-transform group-hover:scale-110",
                        isActive ? "text-indigo-600 dark:text-indigo-400" : item.highlight ? "text-rose-500" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                      )} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.highlight && (
                    <span className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                      Protected
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Channels */}
          <div className="space-y-1 glass-panel rounded-2xl p-2.5 border border-slate-200/80 dark:border-white/[0.08]">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Campus Channels</span>
              <span className="text-[10px] text-slate-400">Live</span>
            </div>

            {categoryChannels.map((channel) => {
              const isChannelActive = location.pathname.includes('category=' + channel.id) || activeFilter === channel.id;

              return (
                <Link
                  key={channel.id}
                  to={`/feed?category=${channel.id}`}
                  onClick={() => setActiveFilter(channel.id)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                    isChannelActive
                      ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <channel.icon size={15} className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                    <span className="truncate">{channel.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Privacy & Zero-Trace Protocol Card */}
          <div className="p-3.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Lock size={14} className="text-emerald-500" />
              <span>Zero-Trace Protocol</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              No IP logs or author credentials are attached to database whispers.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>256-bit Decoupled Shield</span>
            </div>
          </div>

        </div>
      </aside>

      {/* Mobile Floating Glass Bottom Dock */}
      <nav className="lg:hidden fixed bottom-3 left-4 right-4 h-16 glass-panel rounded-2xl flex items-center justify-around px-2 z-50 shadow-2xl border border-slate-200/90 dark:border-white/10">
        {mainNavItems.slice(0, 2).map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/feed' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all relative",
                isActive ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={19} />
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}

        {/* Floating Center Action Button for Mobile */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 -mt-6 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/40 border border-indigo-400/30 transition-transform active:scale-95"
          title="New Whisper"
        >
          <Plus size={22} />
        </button>

        {mainNavItems.slice(2).map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/feed' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all relative",
                isActive ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={19} className={item.highlight && !isActive ? "text-rose-500" : ""} />
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Post Modal */}
      {isModalOpen && (
        <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
