import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export const roles = {
  userA: "damilolaj23@gmail.com",
  userB: "",
  admin: "",
};

export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
