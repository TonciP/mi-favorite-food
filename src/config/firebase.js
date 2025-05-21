// Import the functions you need from the SDKs you need
import '@expo/metro-runtime';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUxaA1gg81RnSNo-vY5zOVEMi8Vsk4A1A",
  authDomain: "univalle-6d13c.firebaseapp.com",
  projectId: "univalle-6d13c",
  storageBucket: "univalle-6d13c.firebasestorage.app",
  messagingSenderId: "61611619986",
  appId: "1:61611619986:web:daab80d67973eb4b59d84b",
  //measurementId: "G-82MXQG2MDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);