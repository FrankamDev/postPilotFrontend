

import { useEffect, useRef, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { user, token, setUser, setToken } = useStateContext();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!token) return <Navigate to="/login" replace />;

  // Dark mode management
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Tableau de bord", icon: "layout-dashboard" },
    { path: "/users", label: "Utilisateurs", icon: "users" },
    { path: "/projects", label: "Projets", icon: "folder-kanban" },
    { path: "/analytics", label: "Statistiques", icon: "bar-chart-3" },
    { path: "/settings", label: "Paramètres", icon: "settings" },
    { path: "/projects", label: "Projets", icon: "folder-kanban" },

  ];
  const onLogout = (e) => {
    // e.preventDefault();

    axiosClient.post('/logout').then(() => {
      setUser(null);
      setToken(null)
    })
  }

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    })
  }, [])
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 lg:static lg:z-auto
          w-72 lg:w-64 xl:w-72
          transform transition-transform duration-400 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          bg-gradient-to-b from-slate-900 to-slate-950
          border-r border-slate-800/50
          flex flex-col shadow-2xl shadow-black/30 lg:shadow-none
        `}
      >
        {/* Logo + collapse toggle */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/25">
              NH
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              NEXTHUB
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/70 scrollbar-track-transparent">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-sm font-medium
                transition-all duration-250
                ${isActive(item.path)
                  ? "bg-cyan-600/20 text-cyan-300 border-l-4 border-cyan-500"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-cyan-300"}
                active:scale-[0.98]
              `}
            >
              <svg className="w-5 h-5 opacity-80 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Tu peux remplacer par des <LucideIcon /> plus tard */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User profile + dropdown */}
        <div className="p-5 border-t border-slate-800/60">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl
                hover:bg-slate-800/50 transition duration-200
                active:scale-[0.98]
              `}
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-semibold text-white shadow-lg shadow-violet-500/30 ring-2 ring-violet-500/20">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>

              <div className="text-left min-w-0">
                <div className="font-medium truncate text-white">{user?.name}</div>                <div className="text-xs text-slate-400 truncate">{user?.email || "—"}</div>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-full left-0 w-full mb-3 bg-slate-900 border border-slate-700/70 rounded-xl shadow-2xl shadow-black/40 py-2 text-sm animate-in fade-in-60 zoom-in-95 slide-in-from-bottom-2 duration-200">
                <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-800/70 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Mon profil
                </Link>
                <button onClick={() => onLogout()} className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-red-400 hover:bg-slate-800/70 hover:text-red-300 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay mobile quand sidebar ouverte */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Bouton ouvrir sidebar (mobile + collapsed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className={`
            fixed top-4 left-4 z-50 lg:hidden
            p-3.5 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600
            text-white shadow-xl shadow-cyan-700/30 hover:shadow-cyan-600/40
            hover:scale-105 active:scale-95 transition-all duration-200
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 px-6 lg:px-10 flex items-center justify-between shadow-sm">
          <h1 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {navItems.find((i) => isActive(i.path))?.label || "Tableau de bord"}
          </h1>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700
                transition-all duration-400 shadow-sm hover:shadow-md group
              `}
              title={isDark ? "Mode clair" : "Mode sombre"}
            >
              <svg className={`w-5 h-5 absolute transition-all duration-500 ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"} text-amber-600`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg className={`w-5 h-5 absolute transition-all duration-500 ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"} text-indigo-300`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>

            <div className="hidden sm:block text-sm text-slate-600 dark:text-slate-400">
              Bienvenue, <span className="font-medium text-cyan-600 dark:text-cyan-400">{user?.name?.split(" ")[0] || "toi"}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-6 lg:p-8 xl:p-10 overflow-auto bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="
            bg-white dark:bg-slate-900/70
            border border-slate-200 dark:border-slate-800/50
            rounded-2xl sm:rounded-3xl
            shadow-xl shadow-black/5 dark:shadow-black/30
            p-6 sm:p-8 lg:p-10
            animate-fade-in-up
          ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
