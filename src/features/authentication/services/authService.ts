import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { LoginSchema } from "../schema/loginSchema";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import type { RegisterSchema } from "../schema/registerSchema";

export const signIn = async (data: LoginSchema) => {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Login successful');

  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/invalid-credential") {
      toast.error("Invalid email or password");
    }
    if (error.code === "auth/too-many-requests") {
      toast.error("Too many requests. Please try again later.");
    }
  }
}

export const logOut = async () => {
  try {
    await auth.signOut();
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Error logging out");
    console.error(error);
  }
};


export const signUp = async (data: RegisterSchema) => {
  const { email, password } = data;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success('User Registered');

  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email already in use");
    }
    if (error.code === "auth/too-many-requests") {
      toast.error("Too many requests. Please try again later.");
    }
  }
}