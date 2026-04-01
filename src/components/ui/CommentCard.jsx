import { MessageCircle } from "lucide-react";

export function CommentCard({ comment }) {
  return (
    <div className="flex gap-4 p-4 border border-border/50 bg-slate-900/50 rounded-lg hover:bg-slate-800/80 transition-colors">
      <div className="w-8 h-8 rounded-full bg-gradient-to-bl from-indigo-500 to-purple-500 shrink-0 mt-1" />
      <div className="flex-1 space-y-1 w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary/90">
            {comment.anonymousUsername || 'Anonymous Owl'}
          </span>
          <span className="text-[10px] text-slate-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-slate-300 break-words w-[95%]">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
