// src/components/auth/AuthDecorativeSide.tsx
import { motion } from "framer-motion"; // npm i framer-motion
import { useEffect, useState } from "react";

interface AuthDecorativeSideProps {
  title?: string;
  subtitle?: string;
  features?: string[];
  isRegister?: boolean; // pour varier légèrement le contenu entre login/register
}

export default function AuthDecorativeSide({
  title = "Bienvenue dans l'univers NEXTHUB",
  subtitle = "Construisez, gérez et scalez votre business comme jamais auparavant.",
  features = [
    "Tableau de bord ultra-rapide",
    "Intégrations natives (Google, GitHub, LinkedIn)",
    "Magic Link & Biométrie mobile",
    "Dark mode premium + animations fluides",
    "Sécurité de niveau entreprise",
  ],
  isRegister = false,
}: AuthDecorativeSideProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-indigo-700 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Fond animé blob/wave */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute w-[120%] h-[120%] -top-1/4 -left-1/4 rounded-full blur-3xl bg-gradient-to-br from-cyan-400/40 to-teal-400/30"
          animate={{
            x: mousePosition.x * 60 - 30,
            y: mousePosition.y * 60 - 30,
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[140%] h-[140%] -bottom-1/3 -right-1/3 rounded-full blur-3xl bg-gradient-to-br from-indigo-500/30 to-violet-400/20"
          animate={{
            x: mousePosition.x * -80 + 40,
            y: mousePosition.y * -80 + 40,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>

      {/* Overlay subtle grid / noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:40px_40px] opacity-40" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 2xl:px-28 py-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8 max-w-xl"
        >
          <div>
            <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="mt-5 text-xl text-cyan-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Liste features avec check animé */}
          <ul className="space-y-5 mt-10">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                className="flex items-center gap-4 text-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
                  <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Citation / slogan final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 pt-10 border-t border-white/10"
          >
            <p className="text-lg italic text-cyan-100/80">
              {isRegister
                ? "“Le futur appartient à ceux qui se lancent aujourd’hui.”"
                : "“Votre prochaine grande réussite commence par une simple connexion.”"}
            </p>
            <p className="mt-2 text-sm text-cyan-200/70">
              — L'équipe SaaS Pro
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Petit badge bottom-right */}
      <div className="absolute bottom-8 right-8 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium text-white/90 shadow-xl">
        Sécurisé • Moderne • Puissant
      </div>

      {/* CSS custom pour wave/blob si besoin plus poussé */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
