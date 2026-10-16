import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { RightWidgetSidebar } from "./RightWidgetSidebar.jsx";

export function AppLayout() {
  const location = useLocation();
  const isLandingOrAuth = location.pathname === "/" || location.pathname.startsWith("/login");
  const isFeedPage = location.pathname.startsWith("/feed") || location.pathname.startsWith("/categories");

  return (
    <div className="min-h-screen bg-background text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Main Container */}
      <div className={`pt-16 w-full ${isLandingOrAuth ? "" : "max-w-7xl mx-auto px-3 sm:px-6"}`}>
        
        {/* Render Left Sidebar if not on landing or auth */}
        {!isLandingOrAuth && <Sidebar />}

        {/* Central Content Area */}
        <main
          className={`w-full min-h-[calc(100vh-4rem)] pb-24 lg:pb-12 ${
            isLandingOrAuth 
              ? "" 
              : `lg:pl-68 ${isFeedPage ? "xl:pr-76" : "max-w-4xl mx-auto"}`
          }`}
        >
          <Outlet />
        </main>

        {/* Render Right Sidebar on Feed/Categories */}
        {!isLandingOrAuth && isFeedPage && <RightWidgetSidebar />}
      </div>
    </div>
  );
}
