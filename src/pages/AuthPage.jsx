import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";
import { cn } from "../utils/cn.js";

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [localMessage, setLocalMessage] = useState("");
  const navigate = useNavigate();
  
  const { login, register, isLoading, error } = useAuthStore();

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalMessage("");
    if (isLogin) {
      const success = await login({ email: formData.email, password: formData.password });
      if (success) navigate("/feed", { replace: true });
    } else {
      const success = await register(formData);
      if (success) {
        setLocalMessage("Account registered in database successfully! Please sign in.");
        setIsLogin(true);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-12 relative overflow-hidden bg-background">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Authentication Card */}
      <div className="w-full max-w-md glass-panel border border-slate-200/90 dark:border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-scale-in space-y-6">
        
        {/* Header with Icon */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 border border-white/20 mb-2">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {isLogin ? "Sign In to Campus" : "Create Student Account"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? "Enter your registered student credentials" : "Register with your student email in the database"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={cn(
              "py-2 text-xs font-bold rounded-lg transition-all",
              isLogin 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700" 
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={cn(
              "py-2 text-xs font-bold rounded-lg transition-all",
              !isLogin 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700" 
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            Create Account
          </button>
        </div>

        {localMessage && (
          <div className="p-3 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-fade-in font-medium">
            {localMessage}
          </div>
        )}

        {error && (
          <div className="animate-shake">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Account Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="StudentHandle"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Student Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-98"
          >
            {isLoading ? (
              <Loader size={18} className="text-white" />
            ) : (
              <>
                <span>{isLogin ? "Sign In to Campus" : "Create Database Account"}</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Security & Cryptography Assurance */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>
            Identity decoupled with SHA-256 tokens. Your account credentials are never stored next to published whispers.
          </span>
        </div>

      </div>

    </div>
  );
}
