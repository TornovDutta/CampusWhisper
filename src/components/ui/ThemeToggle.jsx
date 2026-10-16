import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore.js";

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl border border-slate-700/60 dark:border-white/10 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-all active:scale-95 shadow-sm ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme mode"
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun size={17} className="transition-transform rotate-0 scale-100 duration-200 text-amber-400" />
        ) : (
          <Moon size={17} className="transition-transform rotate-0 scale-100 duration-200 text-indigo-600" />
        )}
      </div>
    </button>
  );
}
