import { Link, useLocation } from "react-router-dom";
import { Home, Bell, ShieldAlert, User, Compass } from "lucide-react";
import { cn } from "../../utils/cn.js";

const navItems = [
  { icon: Home, label: "Feed", path: "/" },
  { icon: Compass, label: "Categories", path: "/categories" },
  { icon: Bell, label: "Notifications", path: "/notifications", badge: "2" },
  { icon: ShieldAlert, label: "Safe Report", path: "/report" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <>
      <aside className="hidden sm:flex flex-col w-64 fixed left-2 top-[72px] bottom-4 bg-surface rounded-xl border border-border p-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-300 hover:bg-surface-hover hover:text-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? "text-primary" : "text-slate-400"} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around px-2 z-50 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors relative",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <item.icon size={20} />
              {item.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500" />
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
