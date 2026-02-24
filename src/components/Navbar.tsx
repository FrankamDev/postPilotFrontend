// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1/api"; // ton API locale

interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;

}

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [currentLang, setCurrentLang] = useState("FR");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Vérifie si déjà connecté au montage ───
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Session invalide");
        }

        const data = await res.json();
        setUser(data.user || data); // adapte selon la structure de ta réponse
      } catch (err) {
        console.warn("Auth check failed → logout", err);
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ─── Déconnexion ───
  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");

    // Optionnel : appel API de logout si ton backend le gère
    if (token) {
      try {
        await fetch(`${API_BASE}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.warn("Logout API call failed", err);
      }
    }

    localStorage.removeItem("auth_token");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-950">PostPilot</div>
          <div className="text-gray-500 text-sm">Chargement...</div>
        </div>
      </nav>
    );
  }

  const isAuthenticated = !!user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/85 backdrop-blur-md border-b border-gray-200/70 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-950 tracking-tight">
            PostPilot
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-8">

            <Link to="/create" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
              Créer
            </Link>

            <Link to="/price" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
              Prix
            </Link>

            {/* Dropdown Langue */}
            <div className="relative" ref={langRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((prev) => !prev);
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                {currentLang}
                <svg className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {["FR", "EN", "ES"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                        // → ici tu pourras plus tard changer i18n ou faire un appel API
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm ${
                        currentLang === lang ? "bg-blue-50 text-blue-700 font-medium" : "hover:bg-gray-50"
                      }`}
                    >
                      {lang === "FR" ? "Français" : lang === "EN" ? "English" : "Español"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Zone authentification */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-2.5 hover:bg-gray-100 rounded-full pl-1 pr-3 py-1 transition"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-800 hidden lg:block">
                    {user?.name?.split(" ")[0] || "Profil"}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-1 z-50 divide-y divide-gray-100">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        Mon profil
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        Tableau de bord
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-700 transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-5 py-6 space-y-6">
            <Link
              to="/create"
              className="block text-base font-medium text-gray-900 hover:text-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              Créer
            </Link>
            <Link
              to="/price"
              className="block text-base font-medium text-gray-900 hover:text-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              Prix
            </Link>

            {/* Langues mobile */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">Langue</p>
              <div className="grid grid-cols-3 gap-3">
                {["FR", "EN", "ES"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setMobileOpen(false);
                    }}
                    className={`py-2.5 text-center text-sm rounded-lg border ${
                      currentLang === lang
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-5 px-2">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`}
                      className="h-11 w-11 rounded-full border border-gray-200"
                    />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="block py-3 text-gray-900 hover:text-blue-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block py-3 text-gray-900 hover:text-blue-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left py-3 text-red-600 hover:text-red-700 mt-3 font-medium"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-3.5 text-center font-medium text-gray-900 hover:text-blue-700 border border-gray-300 rounded-lg mb-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-3.5 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    S'inscrire gratuitement
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
