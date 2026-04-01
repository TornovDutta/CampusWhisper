import { Loader2 } from "lucide-react";

export function Loader({ size = 24, className }) {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2
        size={size}
        className={`animate-spin text-primary ${className || ""}`}
      />
    </div>
  );
}
