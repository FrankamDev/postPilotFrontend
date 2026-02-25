
import { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // npm i react-icons
// import Particles from "react-particles"; // npm i react-particles tsparticles-slim
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
// import { Engine } from "tsparticles-engine";
// import { loadSlim } from "tsparticles-slim"; // Pour particles background innovant
import { useStateContext } from "../context/ContextProvider";

export default function Login() {

  const { setUser, setToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const emailRef = useRef();
  const passwordRef = useRef();


  const handleSocialLogin = (provider: string) => {
    console.log(`OAuth ${provider}`);

  };



  const onSubmit = (e) => {
    e.preventDefault();


    const payload = {
      email: emailRef.current.value,

      password: passwordRef.current.value,

    };
    axiosClient.post('/login', payload).then(({ data }) => {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50/50 to-teal-100/50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-500">
      {/* Background particles innovant – "jamais vu" effet futuriste */}
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ["#06b6d4", "#14b8a6", "#6366f1"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            links: {
              enable: true,
              distance: 150,
              color: "#a5f3fc",
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "attract" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              attract: { distance: 200, duration: 0.4, factor: 1 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      /> */}

      {/* Overlay glassmorphism pour mobile unique */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/20 dark:shadow-indigo-500/20 border border-white/50 dark:border-slate-800/30 overflow-hidden transform transition-all duration-500 md:scale-100 scale-95">
          {/* Header avec animation wave */}
          <div className="relative px-8 pt-10 pb-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 animate-wave opacity-50"></div>
            <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center shadow-xl shadow-cyan-700/40 mb-4 animate-bounce-subtle">
              <span className="text-3xl font-bold text-white">SP</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Entrez dans l'avenir
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
              Connexion passwordless, biométrique ou classique – Choisissez votre voie
            </p>
          </div>

          {/* Contenu formulaire – Mobile: scrollable si keyboard up */}
          <div className="px-8 pb-10 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700/50 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700/50 text-green-800 dark:text-green-300 px-4 py-3 rounded-xl text-sm animate-pulse">
                Connexion réussie ! Redirection...
              </div>
            )}
            {errors && <div>
              {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key][0]}</p>
              ))}
            </div>}
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  ref={emailRef}
                  placeholder="votre@email.com"

                  className="
                    w-full px-4 py-3 rounded-xl border border-slate-300/50 dark:border-slate-700/50
                    bg-white/50 dark:bg-slate-800/30 text-slate-900 dark:text-slate-100
                    focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                    outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500
                    shadow-inner
                  "
                />
              </div>

              {/* Password avec toggle */}
              <div className="group relative">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400">
                  Mot de passe (optionnel pour magic link)
                </label>
                <input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? "text" : "password"}

                  placeholder="••••••••"
                  className="
                    w-full px-4 py-3 rounded-xl border border-slate-300/50 dark:border-slate-700/50
                    bg-white/50 dark:bg-slate-800/30 text-slate-900 dark:text-slate-100
                    focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                    outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-500
                    shadow-inner pr-12
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500"
                  />
                  Se souvenir de moi
                </label>
                <Link to="/forgot-password" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Boutons actions */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full py-3.5 rounded-xl
                    bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500
                    text-white font-medium shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/40
                    focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                    disabled:opacity-50 transition-all duration-300 active:scale-95
                  "
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </button>

                <button
                  type="button"

                  className="
                    w-full py-3.5 rounded-xl
                    bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
                    text-white font-medium shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40
                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                    transition-all duration-300 active:scale-95
                  "
                >
                  Magic Link (sans mot de passe)
                </button>
              </div>
            </form>

            {/* Séparateur */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><hr className="w-full border-t border-slate-300/50 dark:border-slate-700/50" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/70 dark:bg-slate-900/40 px-4 text-slate-500 dark:text-slate-400">Ou avec</span></div>
            </div>

            {/* Sociaux – Grid mobile-friendly */}
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleSocialLogin("google")} className="flex-center py-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-300/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-700/40 transition active:scale-95 shadow-sm">
                <FcGoogle className="text-xl" />
              </button>
              <button onClick={() => handleSocialLogin("github")} className="flex-center py-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-300/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-700/40 transition active:scale-95 shadow-sm">
                <FaGithub className="text-xl text-slate-900 dark:text-white" />
              </button>
              <button onClick={() => handleSocialLogin("linkedin")} className="flex-center py-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-300/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-700/40 transition active:scale-95 shadow-sm">
                <FaLinkedin className="text-xl text-[#0a66c2]" />
              </button>
            </div>

            {/* Inscription */}
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Nouveau ici ? <Link to="/signup" className="font-medium text-cyan-600 dark:text-cyan-400 hover:underline">Créez un compte</Link>
            </p>
          </div>
        </div>

        {/* Footer mobile-unique: hint biométrie */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500 md:hidden">
          Sur mobile ? Utilisez Face ID ou Fingerprint pour une connexion instantanée !
        </p>
      </div>

      {/* CSS pour animations custom */}
      <style>{`
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-wave { animation: wave 8s linear infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-shake { animation: shake 0.5s; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .flex-center { display: flex; align-items: center; justify-content: center; }
      `}</style>
    </div>
  );
}
