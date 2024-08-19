// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJu9yQUC3tNuBlSBoS18lk5dz9iQmd6C4",
  authDomain: "firabase-f133b.firebaseapp.com",
  projectId: "firabase-f133b",
  storageBucket: "firabase-f133b.appspot.com",
  messagingSenderId: "662421566914",
  appId: "1:662421566914:web:00611f3768be575f88d25b",
  measurementId: "G-ZCPQ6D2VRR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
