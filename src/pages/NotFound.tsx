import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 px-6 py-10 sm:px-10 sm:py-12 shadow-2xl shadow-blue-900/40 overflow-hidden">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>404 • Page introuvable</span>
        </div>

        {/* Heading */}
        <div className="relative mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50">
            Oups, on est perdu.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300/90 leading-relaxed">
            La page que tu essaies d’ouvrir n’existe pas, n’existe plus ou a été
            déplacée. Vérifie l’URL ou reviens à l’espace principal de Nexthub.
          </p>
        </div>

        {/* 404 illustration */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500/80 opacity-20 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              404
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 px-4 py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-lg shadow-blue-500/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Retour au tableau de bord
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-sm sm:text-base font-medium text-slate-100 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Revenir à la page précédente
          </button>
        </div>

        {/* Helper text */}
        <p className="relative mt-6 text-xs sm:text-sm text-slate-400">
          Si tu penses que c’est une erreur, contacte le support Nexthub ou
          réessaie plus tard.
        </p>
      </div>
    </div>
  );
}
