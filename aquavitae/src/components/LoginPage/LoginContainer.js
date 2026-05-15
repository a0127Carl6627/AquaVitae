import { useState } from "react";
import LoginPage from "./LoginPage";
import { loginWithEmail } from "../../lib/authService";

// onLogin es la función que App.js pasa como prop:
//   <LoginContainer onLogin={() => setIsAuthenticated(true)} />
// Al llamarla, App.js actualiza su estado y muestra el dashboard
// sin recargar la página.
export default function LoginContainer({ onLogin }) {
  const [generalError,  setGeneralError]  = useState("");
  const [emailError,    setEmailError]    = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading,       setLoading]       = useState(false);

  async function handleLogin({ email, password }) {
    setGeneralError("");
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Ingresa tu correo electrónico");
      return;
    }

    if (!password) {
      setPasswordError("Ingresa tu contraseña");
      return;
    }

    try {
      setLoading(true);

      await loginWithEmail(email, password);
      if (onLogin) onLogin();

    } catch (error) {
      console.error(error);
      setGeneralError("Credenciales incorrectas. Intenta nuevamente.");
      setEmailError("Correo no registrado o incorrecto");
      setPasswordError("Contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginPage
      generalError={generalError}
      emailError={emailError}
      passwordError={passwordError}
      loading={loading}
      onSubmit={handleLogin}
    />
  );
}