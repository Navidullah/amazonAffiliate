// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnQVkg7YvZtlbZal9xPODFgUBv0R9_BDQ",
  authDomain: "the-pulse-a5b57.firebaseapp.com",
  projectId: "the-pulse-a5b57",
  storageBucket: "the-pulse-a5b57.appspot.com",
  messagingSenderId: "862081188156",
  appId: "1:862081188156:web:f7b9e8518e908e382a9e39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// The project's default Firestore database is in Datastore mode (incompatible
// with this SDK), so the teaching whiteboard uses a separate, named
// Native-mode database instead. Create it in the Google Cloud Console with
// this exact database ID before /teach will work.
export const db = getFirestore(app, "shopyor-teach");
