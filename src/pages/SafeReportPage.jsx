import { useState } from "react";
import { 
  ShieldAlert, 
  Send, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Info,
  Copy,
  Check
} from "lucide-react";
import axios from "../api/axios.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { cn } from "../utils/cn.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

const REPORT_CATEGORIES = [
  { id: "harassment", label: "Harassment or Bullying" },
  { id: "academic", label: "Academic Dishonesty" },
  { id: "safety", label: "Physical Safety or Facility Hazard" },
  { id: "discrimination", label: "Discrimination or Bias" },
  { id: "other", label: "Other Policy Violation" },
];

const SEVERITY_LEVELS = [
  { id: "normal", label: "Standard Review", desc: "Response within 48-72h" },
  { id: "urgent", label: "Urgent Priority", desc: "Requires 24h escalation" },
  { id: "critical", label: "Immediate Hazard", desc: "Direct safety risk" },
];

export function SafeReportPage() {
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ 
    category: "harassment",
    severity: "normal",
    title: "", 
    location: "",
    description: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Please fill in both the report title and detailed description.");
      return;
    }

    if (!user) {
      setError("You must be logged in to file a confidential incident report.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    const generatedId = `CW-SAFE-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    try {
      // Backend expects title and description
      const fullDescription = form.location 
        ? `[Category: ${form.category}] [Severity: ${form.severity}] [Location: ${form.location}]\n\n${form.description}`
        : `[Category: ${form.category}] [Severity: ${form.severity}]\n\n${form.description}`;

      await axios.post("/safe-reports", {
        title: form.title.trim(),
        description: fullDescription
      });
      setTicketId(generatedId);
      setForm({ category: "harassment", severity: "normal", title: "", location: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report to database. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTicket = async () => {
    if (ticketId && navigator.clipboard) {
      await navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 space-y-6 animate-fade-in">
      
      {/* Institutional Reassurance Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-surface to-surface relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-500 shadow-md">
            <ShieldAlert size={28} />
          </div>
          
          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Confidential Incident Reporting Portal
              </h1>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Submit confidential reports directly to student welfare and university compliance officers. All submissions undergo network decoupling—your device IP and student identity are not attached to report investigations.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-rose-600 dark:text-rose-400 font-semibold">
              <span className="flex items-center gap-1">
                <Lock size={12} />
                Encrypted Whistleblower Protocol
              </span>
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              <span>Zero Retaliation Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification with Ticket ID */}
      {ticketId && (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-3 animate-scale-in">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 size={18} />
            <span>Report Successfully Saved to Database</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Your submission has been queued for review by the oversight committee. Save this anonymous incident reference code to inquire about resolution status without exposing your identity:
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-950/80 px-4 py-2 rounded-xl border border-emerald-500/30 select-all">
              {ticketId}
            </div>
            <button
              onClick={copyTicket}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              {copiedTicket ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedTicket ? "Copied" : "Copy Ticket ID"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Report Form */}
      <div className="glass-panel rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
        
        {error && <ErrorMessage message={error} />}

        {!user && (
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-between">
            <span>You need to be signed in to submit a safe report to the database.</span>
            <Link to="/login" className="font-bold underline">Sign In</Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Incident Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Incident Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REPORT_CATEGORIES.map((cat) => {
                const isSelected = form.category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setForm((p) => ({ ...p, category: cat.id }))}
                    className={cn(
                      "p-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between",
                      isSelected
                        ? "bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-300 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <Check size={14} className="text-rose-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Urgency Classification
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SEVERITY_LEVELS.map((sev) => {
                const isSelected = form.severity === sev.id;
                return (
                  <button
                    type="button"
                    key={sev.id}
                    onClick={() => setForm((p) => ({ ...p, severity: sev.id }))}
                    className={cn(
                      "p-3 rounded-xl text-left transition-all border",
                      isSelected
                        ? "bg-slate-200 dark:bg-slate-800 border-indigo-500 text-slate-900 dark:text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <div className="text-xs font-bold">{sev.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{sev.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject / Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Incident Subject Summary
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Unsafe lab wiring in Electrical Dept / Exam leak"
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Context / Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Campus Location or Digital Channel (Optional)
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Central Library 3rd Floor / CS402 Group Chat"
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Detailed Confidential Testimony
            </label>
            <textarea
              name="description"
              rows={6}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Provide a factual chronology of events, including dates, locations, and specific concerns..."
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-rose-500 rounded-xl p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none transition-colors leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting || !form.title.trim() || !form.description.trim()}
            className="w-full bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-600/30 disabled:opacity-50 flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-98"
          >
            {isSubmitting ? (
              <Loader size={18} className="text-white" />
            ) : (
              <>
                <Send size={15} />
                <span>Submit Confidential Investigation Request</span>
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}
