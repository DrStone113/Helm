// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "group-manager-5b844.firebaseapp.com",
  projectId: "group-manager-5b844",
  storageBucket: "group-manager-5b844.firebasestorage.app",
  messagingSenderId: "257205329687",
  appId: "1:257205329687:web:b132f2b0965479ed01e152",
  measurementId: "G-2DML9KMNTT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);