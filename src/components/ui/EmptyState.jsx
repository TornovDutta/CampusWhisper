import { Compass } from "lucide-react";

export function EmptyState({ 
  message = "No content available in this channel.", 
  icon: Icon = Compass,
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
        <Icon size={30} />
      </div>
      <div className="space-y-1 max-w-sm">
        <p className="text-sm font-bold text-slate-200">{message}</p>
        <p className="text-xs text-slate-400">
          Be the first student to publish an anonymous update or explore other channels.
        </p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
