import { AlertCircle } from "lucide-react";

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-4 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
      <AlertCircle size={18} />
      <p>{message}</p>
    </div>
  );
}
