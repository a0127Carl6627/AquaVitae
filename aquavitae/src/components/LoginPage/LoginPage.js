import { useState } from "react";
import "./LoginPage.css";
import logo from "../../assets/logo-aqua.png";

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
    <main className="login-page">
      <section className="login-header">
  <div className="login-logo-mark">
    <img src={logo} alt="AquaVitae Logo" />
  </div>

  <div className="login-header-text">
    <h1>AquaVitae</h1>
    <p>Sistema de monitoreo de riesgo hídrico</p>
  </div>
</section>

      <section className="login-card">
        {generalError && (
          <div className="login-alert">
            <span>⚠</span>
            <p>{generalError}</p>
          </div>
        )}

        <div className="login-title">
          <h2>Inicio de sesión</h2>
          <p>Accede con tus credenciales de directivo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="login-label">Correo electrónico</label>

          <div className={`login-input-wrapper ${emailError ? "has-error" : ""}`}>
            <span className="login-input-icon">✉</span>
            <input
              type="email"
              placeholder="correo@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {emailError && <p className="login-field-error">{emailError}</p>}

          <label className="login-label">Contraseña</label>

          <div className={`login-input-wrapper ${passwordError ? "has-error" : ""}`}>
            <span className="login-input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              className="login-eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          {passwordError && <p className="login-field-error">{passwordError}</p>}

          <button type="button" className="login-forgot">
            ¿Olvidaste tu contraseña?
          </button>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Iniciando..." : "↪ Iniciar sesión"}
          </button>
        </form>
      </section>

      <footer className="login-footer">
        © 2026 AquaVitae. Todos los derechos reservados.
      </footer>
    </main>
  );
}