import { initializeApp } from "firebase/app"; // v9 compat packages are API
import {getAuth, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmgB5vrK9tYCPWmcfMu0otKGev6wTZfVU",
  authDomain: "udemy-firebase-d61e0.firebaseapp.com",
  projectId: "udemy-firebase-d61e0",
  storageBucket: "udemy-firebase-d61e0.appspot.com",
  messagingSenderId: "202958893703",
  appId: "1:202958893703:web:b7a95f3b239e1d1644fe22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
