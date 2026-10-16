import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Clock
} from "lucide-react";
import axios from "../api/axios.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { cn } from "../utils/cn.js";

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "reply",
    title: "New reply on your whisper",
    message: "Anonymous Owl replied to your post in the Placements channel.",
    targetUrl: "/feed",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18m ago
  },
  {
    id: "notif-2",
    type: "upvote",
    title: "Milestone reached",
    message: "Your whisper about the library renovation passed 50 upvotes.",
    targetUrl: "/feed",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5h ago
  },
  {
    id: "notif-3",
    type: "system",
    title: "Pseudonym rotation complete",
    message: "Your weekly pseudonymous alias has been refreshed. Past posts remain detached.",
    targetUrl: "/profile",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1d ago
  },
  {
    id: "notif-4",
    type: "reply",
    title: "Discussion update",
    message: "Campus Scholar commented on the midterm grading discussion.",
    targetUrl: "/feed",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  }
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/notifications");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setNotifications(res.data);
        }
      } catch (err) {
        // Fallback to default notifications
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === "all") return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const timeAgo = (dateStr) => {
    if (!dateStr) return "Just now";
    const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case "reply":
        return <MessageSquare size={16} className="text-indigo-400" />;
      case "upvote":
        return <ThumbsUp size={16} className="text-emerald-400" />;
      case "system":
        return <ShieldCheck size={16} className="text-cyan-400" />;
      default:
        return <Bell size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell size={22} className="text-indigo-400" />
            <span>Campus Activity</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Decoupled notifications for your anonymous interactions.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Check size={13} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-xs font-semibold">
        {["all", "reply", "upvote", "system"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1.5 rounded-lg capitalize transition-colors",
              activeTab === tab
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {tab === "all" ? "All Activity" : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {isLoading && (
          <div className="py-12 flex justify-center">
            <Loader size={32} />
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {!isLoading && filteredNotifs.length === 0 && (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-2 text-slate-400 border border-white/[0.06]">
            <p className="text-sm font-semibold">No notifications in this tab.</p>
            <p className="text-xs text-slate-500">You will be notified when peers reply or upvote your anonymous posts.</p>
          </div>
        )}

        {filteredNotifs.map((notif) => (
          <Link
            to={notif.targetUrl || "/feed"}
            key={notif.id}
            className={cn(
              "glass-panel p-4 rounded-2xl border transition-all flex items-start gap-3.5 block group",
              !notif.isRead
                ? "border-indigo-500/30 bg-slate-900/90 shadow-md"
                : "border-white/[0.06] hover:border-slate-700/80 hover:bg-slate-800/40"
            )}
          >
            {/* Icon Box */}
            <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              {getNotifIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-500 shrink-0 flex items-center gap-1">
                  <Clock size={10} />
                  {timeAgo(notif.createdAt)}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {notif.message}
              </p>
            </div>

            {!notif.isRead && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
            )}
          </Link>
        ))}
      </div>

    </div>
  );
}
