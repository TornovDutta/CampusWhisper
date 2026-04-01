import { Ghost } from "lucide-react";

export function EmptyState({ message = "No content available", icon: Icon = Ghost }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-slate-400 space-y-4">
      <div className="w-16 h-16 rounded-full bg-surface-hover/50 flex items-center justify-center">
        <Icon size={32} className="text-primary/70" />
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
