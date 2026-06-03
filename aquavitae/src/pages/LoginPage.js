import { useState } from "react";
import clsx from "clsx";
import logo from "../assets/logo-aqua.png";

const INPUT_WRAPPER = "flex min-h-[52px] items-center gap-3 rounded-lg border bg-white px-4";

export default function LoginPage({
  generalError = "",
  emailError = "",
  passwordError = "",
  loading = false,
  onSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (onSubmit) {
      onSubmit({ email, password });
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-7 overflow-hidden bg-[radial-gradient(circle_at_top,#f8fbff_0%,#edf6ff_42%,#eaf4ff_100%)] px-4 py-8 text-[#0f172a] before:absolute before:-bottom-20 before:left-[-45%] before:z-0 before:h-[180px] before:w-[120%] before:rounded-[50%] before:bg-[rgba(191,219,254,0.35)] before:content-[''] after:absolute after:-bottom-20 after:right-[-45%] after:z-0 after:h-[180px] after:w-[120%] after:rounded-[50%] after:bg-[rgba(191,219,254,0.35)] after:content-['']">
      <section className="relative z-[1] flex items-center justify-center gap-[18px]">
        <div className="flex h-[200px] w-[200px] shrink-0 items-center justify-center">
          <img src={logo} alt="AquaVitae Logo" className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="m-0 text-[42px] font-extrabold tracking-[-1px] text-[#0f2a4d]">AquaVitae</h1>
          <p className="mb-0 mt-1 text-sm font-medium text-[#64748b]">Sistema de monitoreo de riesgo hídrico</p>
        </div>
      </section>

      <section className="relative z-[1] w-full max-w-[560px] rounded-[14px] bg-white p-[30px] shadow-[0_20px_45px_rgba(15,23,42,0.14)]">
        {generalError && (
          <div className="mb-7 flex items-center gap-3.5 rounded-[10px] bg-[#feecef] px-[18px] py-[15px] font-bold text-[#dc4056]">
            <span>⚠</span>
            <p className="m-0">{generalError}</p>
          </div>
        )}

        <div>
          <h2 className="m-0 text-[28px] text-[#0f172a]">Inicio de sesión</h2>
          <p className="mb-6 mt-2 font-medium text-[#64748b]">Accede con tus credenciales de AquaVitae</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 mt-[18px] block text-sm font-bold text-[#334155]">Correo electrónico</label>

          <div className={clsx(INPUT_WRAPPER, emailError ? "border-[#f3a5af]" : "border-[#d8dee9]")}>
            <span className="text-[#94a3b8]">✉</span>
            <input
              type="email"
              placeholder="correo@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="flex-1 border-none text-[15px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
            />
          </div>

          {emailError && <p className="mb-0 mt-2 text-sm font-semibold text-[#e05264]">{emailError}</p>}

          <label className="mb-2 mt-[18px] block text-sm font-bold text-[#334155]">Contraseña</label>

          <div className={clsx(INPUT_WRAPPER, passwordError ? "border-[#f3a5af]" : "border-[#d8dee9]")}>
            <span className="text-[#94a3b8]">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="flex-1 border-none text-[15px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
            />

            <button
              type="button"
              className="cursor-pointer border-none bg-transparent text-base"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          {passwordError && <p className="mb-0 mt-2 text-sm font-semibold text-[#e05264]">{passwordError}</p>}

          <button type="button" className="mb-[26px] ml-auto mt-[18px] block cursor-pointer border-none bg-transparent font-bold text-[#2573d9]">
            ¿Olvidaste tu contraseña?
          </button>

          <button type="submit" className="min-h-[58px] w-full cursor-pointer rounded-lg border-none bg-[#1677ff] text-[17px] font-extrabold text-white shadow-[0_10px_20px_rgba(22,119,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
            {loading ? "Iniciando..." : "↪ Iniciar sesión"}
          </button>
        </form>
      </section>

      <footer className="relative z-[1] text-[13px] font-semibold text-[#64748b]">
        © 2026 AquaVitae. Todos los derechos reservados.
      </footer>
    </main>
  );
}
