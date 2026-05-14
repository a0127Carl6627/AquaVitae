import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;

export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const token = await userCredential.user.getIdToken();

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await signOut(auth);
    throw new Error("No se pudo validar la sesión con el backend");
  }

  const backendUser = await response.json();

  localStorage.setItem("aquavitae_token", token);
  localStorage.setItem("aquavitae_user", JSON.stringify(backendUser));

  return {
    firebaseUser: userCredential.user,
    backendUser,
    token,
  };
}

export async function logout() {
  localStorage.removeItem("aquavitae_token");
  localStorage.removeItem("aquavitae_user");

  await signOut(auth);
}