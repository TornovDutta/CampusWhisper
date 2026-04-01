import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { HomeFeed } from "./pages/HomeFeed";
import { PostDetails } from "./pages/PostDetails";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SafeReportPage } from "./pages/SafeReportPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "./components/ui/Loader";

function App() {
  const { fetchMe, token, isLoading } = useAuthStore();
  
  // Re-hydrate user state if token exists
  useEffect(() => {
    if (token) {
       fetchMe();
    }
  }, [token, fetchMe]);

  if (isLoading && token && !useAuthStore.getState().user) {
    return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader size={48} /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="feed" element={<HomeFeed />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
             <Route path="categories" element={<HomeFeed />} />
             <Route path="post/:id" element={<PostDetails />} />
             <Route path="notifications" element={<NotificationsPage />} />
             <Route path="report" element={<SafeReportPage />} />
             <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
