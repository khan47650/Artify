import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfGblM29q68BOrJNi2xN1jyECfvRnTqH4",
    authDomain: "fir-f2403.firebaseapp.com",
    projectId: "fir-f2403",
    storageBucket: "fir-f2403.firebasestorage.app",
    messagingSenderId: "759260433628",
    appId: "1:759260433628:web:304abafc28ecdf06727819",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();