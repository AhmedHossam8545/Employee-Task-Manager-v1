// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX0Ljil1fgn6UGsXZzZiUVmxqVZ1qVCNE",
  authDomain: "fir-basics-5b4d9.firebaseapp.com",
  projectId: "fir-basics-5b4d9",
  storageBucket: "fir-basics-5b4d9.firebasestorage.app",
  messagingSenderId: "1045947522153",
  appId: "1:1045947522153:web:1962e546bbd0ca625456f8",
  measurementId: "G-9WLHNJ2M3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);