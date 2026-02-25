
import { useRef, useState } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash, FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Particles from "react-particles";
import { Link, useNavigate } from "react-router-dom";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Signup() {
  const { setUser, setToken } = useStateContext()
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);




  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };




  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();



  const onSubmit = (e) => {
    e.preventDefault();


    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient.post('/signup', payload).then(({ data }) => {
      setUser(data.user)
      setToken(data.token)
    })
      .catch(err => {
        console.log(err)
        const response = err.response;
        if (response && response.status === 422) {

          setErrors(response.data.errors)
          console.log(response.data.errors)
        }
      })
    // console.log(payload);


  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-50/60 to-cyan-100/50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6 transition-colors duration-500">
      {/* Particles background – même style que login */}
      <Particles
        id="tsparticles-register"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#14b8a6", "#06b6d4", "#8b5cf6"] },
            shape: { type: "circle" },
            opacity: { value: 0.35, random: true, anim: { enable: true, speed: 1 } },
            size: { value: 2.8, random: true },
            links: { enable: true, distance: 160, color: "#a5f3fc", opacity: 0.25, width: 1 },
            move: { enable: true, speed: 0.9, direction: "none", random: true, outModes: "out" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
            modes: { grab: { distance: 180, links: { opacity: 0.5 } }, push: { quantity: 4 } },
          },
          detectRetina: true,
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/75 dark:bg-slate-900/45 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-teal-500/20 dark:shadow-violet-500/20 border border-white/60 dark:border-slate-700/30 overflow-hidden transform transition-all duration-500 md:scale-100 scale-[0.96]">
          {/* Header */}
          <div className="relative px-8 pt-10 pb-7 text-center">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 animate-gradient-x"></div>

            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-teal-700/40 mb-5 animate-pulse-slow">
              <span className="text-3xl font-bold text-white">NH</span>
            </div>

            <h1 className="text-3xl sm:text-3.5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              Créez votre futur
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
              Rejoignez des milliers d'utilisateurs qui construisent déjà demain
            </p>
          </div>

          {/* Formulaire */}
          <div className="px-7 sm:px-10 pb-10 space-y-6 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500/70 scrollbar-track-transparent pb-12">
            {error && (
              <div className="bg-red-50/80 dark:bg-red-900/35 border border-red-300/70 dark:border-red-700/50 text-red-800 dark:text-red-200 px-5 py-4 rounded-2xl text-sm animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-50/80 dark:bg-emerald-900/35 border border-emerald-300/70 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-200 px-5 py-4 rounded-2xl text-sm flex items-center gap-3 animate-pulse">
                <FaCheckCircle className="text-xl flex-shrink-0" />
                Compte créé ! Redirection en cours...
              </div>
            )}
            {errors && <div>
              {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key][0]}</p>
              ))}
            </div>}
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Nom complet */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Nom complet
                </label>
                <input
                  ref={nameRef}
                  id="name"

                  type="text"


                  placeholder="Frank Kamgang"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/35 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500 shadow-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Adresse email
                </label>
                <input
                  ref={emailRef}
                  id="email"

                  type="email"

                  placeholder="vous@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/35 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500 shadow-sm"
                />
              </div>

              {/* Mot de passe */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Mot de passe
                </label>
                <input
                  ref={passwordRef}
                  id="password"

                  type={showPassword ? "text" : "password"}

                  placeholder="Au moins 8 caractères"
                  required
                  minLength={8}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/35 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500 shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {/* Confirmation mot de passe */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  ref={passwordConfirmationRef}

                  id="confirmPassword"

                  type={showConfirmPassword ? "text" : "password"}

                  placeholder="Confirmez votre mot de passe"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/35 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500 shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-10 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {/* CGU */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  // checked={form.acceptTerms}

                  className="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="acceptTerms" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-teal-600 dark:text-teal-400 hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className={`
                    w-full py-4 rounded-2xl text-white font-semibold text-base
                    bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500
                    shadow-xl shadow-teal-700/30 hover:shadow-teal-600/40
                    focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-300 active:scale-[0.98]
                  `}
                >
                  {isLoading ? "Création en cours..." : success ? "Compte créé !" : "Créer mon compte"}
                </button>

                <button
                  type="button"

                  className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-300/70 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FcGoogle size={22} />
                    <span>S'inscrire avec Google</span>
                  </div>
                </button>
              </div>
            </form>

            {/* Séparateur + autres providers */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300/50 dark:border-slate-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-5 bg-white/80 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400">
                  ou avec
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button

                className="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </button>

              <button

                className="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[#0a66c2] text-white hover:bg-[#094e9f] transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="font-medium text-teal-600 dark:text-teal-400 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-600 md:hidden">
          Inscription sécurisée • Nous ne vendons jamais vos données
        </p>
      </div>

      {/* Animations custom */}
      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
