import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        {/* Badge */}
        <div className="inline-flex items-center justify-center mb-6">
          <span className="px-4 py-1 text-sm font-semibold tracking-widest text-yellow-400 bg-white/10 border border-yellow-400/30 rounded-full">
            404 — Page introuvable
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6">
          Oups !
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
          La page que tu recherches n’existe pas ou a été déplacée.
          Vérifie l’URL ou retourne à l’accueil.
        </p>

        {/* Illustration Style Element */}
        <div className="relative mb-10">
          <div className="w-32 h-32 mx-auto rounded-full bg-yellow-400/20 blur-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-yellow-400">404</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-yellow-400 text-blue-950 font-semibold hover:bg-yellow-300 transition duration-300 shadow-lg"
          >
            Retour à l’accueil
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition duration-300"
          >
            Page précédente
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-blue-200/70">
          Si le problème persiste, contacte le support.
        </p>

      </div>
    </div>
  );
}