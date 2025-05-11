// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA4KMavEUTnP0YgnPgx7WXXJuX_yba5Yk",
  authDomain: "rentx-a0de9.firebaseapp.com",
  projectId: "rentx-a0de9",
  storageBucket: "rentx-a0de9.firebasestorage.app",
  messagingSenderId: "33467472522",
  appId: "1:33467472522:web:e27a0894164b023f192b73",
  measurementId: "G-7JCV4W9BLR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
