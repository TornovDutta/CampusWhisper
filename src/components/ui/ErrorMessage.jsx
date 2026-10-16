import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-4 text-xs sm:text-sm text-rose-300 bg-rose-950/40 rounded-2xl border border-rose-500/30 animate-fade-in shadow-sm">
      <div className="flex items-center gap-2.5">
        <AlertCircle size={17} className="text-rose-400 shrink-0" />
        <p className="font-medium leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold transition-colors"
        >
          <RefreshCw size={12} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
