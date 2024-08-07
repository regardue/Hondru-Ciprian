// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3eviO7CvlBU0vw4eLq4u6u-AnAzDSBng",
    authDomain: "proiect-72497.firebaseapp.com",
    projectId: "proiect-72497",
    storageBucket: "proiect-72497.appspot.com",
    messagingSenderId: "786435970950",
    appId: "1:786435970950:web:1b10cf6eeedd92d407be07",
    measurementId: "G-DX284R3DDZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
