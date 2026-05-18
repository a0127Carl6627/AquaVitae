import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  localStorage.setItem("aquavitae_token", token);
  return { firebaseUser: userCredential.user, token };
}

export async function logout() {
  localStorage.removeItem("aquavitae_token");
  localStorage.removeItem("aquavitae_user");

  await signOut(auth);
}