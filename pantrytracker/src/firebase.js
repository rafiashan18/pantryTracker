import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCRYSwwbAlHYG0NffxeAxjzicaVugnCvkc",
  authDomain: "pantry-tracker-f55dc.firebaseapp.com",
  projectId: "pantry-tracker-f55dc",
  storageBucket: "pantry-tracker-f55dc.appspot.com",
  messagingSenderId: "228842806999",
  appId: "1:228842806999:web:79904c3812179e6390da92",
  measurementId: "G-VFVPPTSEJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
export default app;