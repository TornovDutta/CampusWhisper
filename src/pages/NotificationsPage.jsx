import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Check, 
  Clock 
} from "lucide-react";
import axios from "../api/axios.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { cn } from "../utils/cn.js";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await axios.get("/notifications");
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load notifications from the database.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await axios.put("/notifications/read-all");
    } catch (e) {
      console.error("Failed to mark all as read:", e);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await axios.put(`/notifications/${notif.id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
        );
      } catch (e) {
        console.error("Failed to mark notification as read:", e);
      }
    }
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
    <div className="w-full max-w-2xl mx-auto py-6 space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell size={22} className="text-indigo-600 dark:text-indigo-400" />
            <span>Campus Activity</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Decoupled notifications for your anonymous interactions.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Check size={13} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-2 text-xs font-semibold">
        {["all", "reply", "upvote", "system"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1.5 rounded-lg capitalize transition-colors",
              activeTab === tab
                ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
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

        {!isLoading && !error && filteredNotifs.length === 0 && (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-2 text-slate-600 dark:text-slate-400 border border-slate-200/90 dark:border-white/[0.06]">
            <p className="text-sm font-semibold">No notifications found in your account.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Activity on your whispers and replies will appear here.</p>
          </div>
        )}

        {filteredNotifs.map((notif) => {
          const contentElement = (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={cn(
                "glass-panel p-4 rounded-2xl border transition-all flex items-start gap-3.5 block cursor-pointer",
                !notif.isRead
                  ? "border-indigo-500/30 bg-indigo-50/60 dark:bg-slate-900/90 shadow-md"
                  : "border-slate-200/90 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-slate-700/80"
              )}
            >
              {/* Icon Box */}
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {getNotifIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {notif.title || "Notification"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock size={10} />
                    {timeAgo(notif.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
              )}
            </div>
          );

          return notif.postId ? (
            <Link key={notif.id} to={`/post/${notif.postId}`} className="block">
              {contentElement}
            </Link>
          ) : (
            <div key={notif.id}>{contentElement}</div>
          );
        })}
      </div>

    </div>
  );
}
