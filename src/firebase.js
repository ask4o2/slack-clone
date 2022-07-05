// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMTirCNyFO85jdcz7BNr6e1hIpxqUj704",
  authDomain: "slack-f83ce.firebaseapp.com",
  projectId: "slack-f83ce",
  storageBucket: "slack-f83ce.appspot.com",
  messagingSenderId: "812527793316",
  appId: "1:812527793316:web:6f34ea3e6a24ef2189e231",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { db, provider, auth };
