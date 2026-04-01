import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "../components/ui/Loader.jsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.jsx";

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();
  
  const { login, register, isLoading, error } = useAuthStore();

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login({ email: formData.email, password: formData.password });
      if (success) navigate("/feed", { replace: true });
    } else {
      const success = await register(formData);
      if (success) setIsLogin(true); // Switch to login after successful register
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 sm:px-6 relative overflow-hidden bg-background">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-hover/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-xl shadow-black/40 p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm font-medium text-slate-400">
            {isLogin ? "Sign in to join the whisper" : "Sign up to start whispering anonymously"}
          </p>
        </div>

        {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
             <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Campus Insider"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
             </div>
          )}

          <div className="space-y-1.5">
             <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email address</label>
             <input
               type="email"
               name="email"
               required
               placeholder="you@campus.edu"
               value={formData.email}
               onChange={handleChange}
               className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
             />
          </div>

          <div className="space-y-1.5 pb-2">
             <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
             <input
               type="password"
               name="password"
               required
               placeholder="••••••••"
               value={formData.password}
               onChange={handleChange}
               className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
             />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? <Loader size={20} className="text-white" /> : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <p className="text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
