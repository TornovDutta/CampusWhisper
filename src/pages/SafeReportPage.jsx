import { useState } from "react";
import { ShieldAlert, Send } from "lucide-react";
import axios from "../api/axios.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";

export function SafeReportPage() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    
    setIsSubmitting(true);
    setError("");
    try {
      await axios.post("/safe-reports", form);
      setSuccess(true);
      setForm({ title: "", description: "" });
    } catch (err) {
       setError(err.response?.data?.message || "Failed to submit report. Please try again.");
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 sm:pb-8">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex flex-col items-center justify-center shrink-0 border border-red-500/30">
          <ShieldAlert size={32} className="text-red-500" />
        </div>
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-2xl font-bold text-red-500">Safe Report</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Submit a confidential report regarding serious issues such as harassment, bullying, or safety concerns. This will be sent directly to university moderators anonymously.
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        {error && <div className="mb-6"><ErrorMessage message={error} /></div>}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium">
             Your report has been successfully submitted and will be reviewed shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Issue Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief summary of the issue"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Detailed Description</label>
            <textarea
              name="description"
              rows={6}
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide as much detail as possible to help moderators investigate immediately..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 resize-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !form.title || !form.description}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader size={20} className="text-white" /> : (
              <>
                <Send size={18} />
                Submit Confidential Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
