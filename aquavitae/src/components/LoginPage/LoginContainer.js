import { useState } from "react";
import LoginPage from "./LoginPage";
import { loginWithEmail } from "../../lib/authService";

export default function LoginContainer() {
  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const result = await loginWithEmail(email, password);

      console.log("Login correcto:", result);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);

      setGeneralError("Credenciales incorrectas. Intenta nuevamente.");
      setEmailError("Correo no registrado");
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