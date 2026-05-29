import LoginPage from "./LoginPage";

export default {
  title: "Pages/LoginPage",
  component: LoginPage,
};

export const Default = () => <LoginPage />;

export const WithErrors = () => (
  <LoginPage
    generalError="Credenciales incorrectas. Intenta nuevamente."
    emailError="Correo no registrado"
    passwordError="Contraseña incorrecta"
  />
);

export const Loading = () => <LoginPage loading />;