import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDw7j1AYE92at_mhz2hLsVYba1wukQeIgg",
  authDomain: "linkup-chatapp-database.firebaseapp.com",
  projectId: "linkup-chatapp-database",
  storageBucket: "linkup-chatapp-database.firebasestorage.app",
  messagingSenderId: "128442507274",
  appId: "1:128442507274:web:8c90b97296f381f46c3ff3",
  measurementId: "G-EDJQ9E6S4M"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
