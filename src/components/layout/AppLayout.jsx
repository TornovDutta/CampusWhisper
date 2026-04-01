import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";

export function AppLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-14 max-w-6xl mx-auto">
        {user && <Sidebar />}
        <main className={`flex-1 w-full min-h-[calc(100vh-3.5rem)] pb-20 sm:pb-8 ${user ? "sm:pl-64" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
