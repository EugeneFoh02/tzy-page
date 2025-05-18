// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAmTjyULRP6CQcYjHfMRGFyjWwEARlckiA",
  authDomain: "tzybadminton.firebaseapp.com",
  projectId: "tzybadminton",
  storageBucket: "tzybadminton.appspot.com",
  messagingSenderId: "237934267671",
  appId: "1:237934267671:web:daa63faf66899eb9dafb52",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app, "https://tzybadminton-default-rtdb.asia-southeast1.firebasedatabase.app/");
export { app };
