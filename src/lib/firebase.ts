import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Firebase configuration
// Thay thế bằng config từ Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCEz-4A-uUEGJvjGS4IXIY4qa1n9-AKqLU",
  authDomain: "ngayle-272a1.firebaseapp.com",
  projectId: "ngayle-272a1",
  storageBucket: "ngayle-272a1.firebasestorage.app",
  messagingSenderId: "217466221490",
  appId: "1:217466221490:web:bc54f55f303dac3abeeaab",
  measurementId: "G-BJCBL42PMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
