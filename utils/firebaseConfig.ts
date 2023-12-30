// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChiYKfHGTaqopX03dwix2ZPYUvGaQl8K8",
  authDomain: "social-app-60d6d.firebaseapp.com",
  projectId: "social-app-60d6d",
  storageBucket: "social-app-60d6d.appspot.com",
  messagingSenderId: "1011392887824",
  appId: "1:1011392887824:web:60b9f578ab4f239ad79e95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);