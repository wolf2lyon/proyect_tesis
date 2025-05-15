// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,updateProfile, updateEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-XQWHJUaWYThMV2RVsQ7WfHr99kzOp4",
  authDomain: "app-auth-32a20.firebaseapp.com",
  projectId: "app-auth-32a20",
  storageBucket: "app-auth-32a20.firebasestorage.app",
  messagingSenderId: "724062172058",
  appId: "1:724062172058:web:c62c9fac79dd69cc8b8023",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const updateUserProfile = updateProfile;
export const updateUserEmail = updateEmail;
export default app;
