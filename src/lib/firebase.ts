import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXzBaYiSrTa4rSsSnEZA7h8waBOPC4oNE",
  authDomain: "rope-1e117.firebaseapp.com",
  projectId: "rope-1e117",
  storageBucket: "rope-1e117.firebasestorage.app",
  messagingSenderId: "795187810522",
  appId: "1:795187810522:web:e3384cec6d89bda56c55e3",
  measurementId: "G-BPXYRPYYDV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
