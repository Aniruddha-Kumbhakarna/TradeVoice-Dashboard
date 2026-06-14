import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Phone,
  Server,
  Activity,
  Headphones,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Header } from "./Header";

export function Root() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/users", icon: Users, label: "Manage My Users" },
    { path: "/lines", icon: Phone, label: "Manage My Lines" },
    {
      path: "/turrets",
      icon: Server,
      label: "Manage My Turrets",
    },
    { path: "/status", icon: Activity, label: "System Health" },
    {
      path: "/change-calendar",
      icon: Calendar,
      label: "Change Calendar",
    },
    {
      path: "/support",
      icon: Headphones,
      label: "Support Centre",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`p-6 border-b border-slate-700 ${isCollapsed ? "px-4" : ""}`}
        >
          {!isCollapsed ? (
            <>
              <h1 className="text-xl font-semibold">
                Trading Voice Admin
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Management Console
              </p>
            </>
          ) : (
            <div className="text-center">
              <span className="text-xl font-bold">TV</span>
            </div>
          )}
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#B266FF] text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    } ${isCollapsed ? "justify-center" : ""}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            title={
              isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}