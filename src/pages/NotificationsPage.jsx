import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { Bell } from "lucide-react";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 sm:pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-slate-100">Notifications</h1>
      </div>

      <div className="space-y-4">
        {isLoading && <Loader size={32} />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && notifications.length === 0 && (
          <div className="text-center py-12 text-slate-500">
             No recent notifications.
          </div>
        )}
        
        {notifications.map((notif, i) => (
          <div key={i} className="p-4 bg-surface border border-border rounded-xl shadow-sm flex items-start gap-4">
             <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
             <div className="flex-1">
                <p className="text-sm text-slate-200">{notif.message}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">
                   {new Date(notif.createdAt).toLocaleDateString()}
                </span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
