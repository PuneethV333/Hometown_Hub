import toast from "react-hot-toast";
import type {
  signInViaEmailType,
  signUpViaEmailType,
} from "../types/Login.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Auth, googleAuthProvider } from "../config/firebase.config";

export const signInViaEmail = async (payload: signInViaEmailType) => {
  try {
    if (!payload) {
      toast.error("payload not provided");
      return;
    }
    
    await signOut(Auth);


    const res = await signInWithEmailAndPassword(
      Auth,
      payload.email,
      payload.password,
    );

    if (!res) {
      toast.error("signIn failed");
      return;
    }

    const token = await res.user.getIdToken();
    localStorage.setItem("firebaseToken", token);

    return res.user;
  } catch (err) {
    toast.error("signIn failed");
    console.error(err);
  }
};

export const signUpViaEmail = async (payload: signUpViaEmailType) => {
  try {
    if (!payload) {
      toast.error("payload not provided");
      return;
    }
    
    await signOut(Auth);

    const res = await createUserWithEmailAndPassword(
      Auth,
      payload.email,
      payload.password,
    );

    if (!res) {
      toast.error("signUp failed");
      return;
    }

    const token = await res.user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    return res.user;
  } catch (err) {
    toast.error("signIn failed");
    console.error(err);
  }
};

export const viaGoogle = async () => {
  try {
    await signOut(Auth);
    // Firebase sign-out does not sign out of Google in the browser. Ask which
    // Google account to use instead of silently reusing the previous one.
    googleAuthProvider.setCustomParameters({ prompt: "select_account" });

    const res = await signInWithPopup(Auth, googleAuthProvider);
    if (!res) {
      toast.error("signUp failed");
      return;
    }

    const token = await res.user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    return res.user;
  } catch (err) {
    toast.error("signIn failed");
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(Auth);
    localStorage.removeItem("firebaseToken");
    return true;
  } catch (err) {
    toast.error("logout failed");
    console.error(err);
  }
};
