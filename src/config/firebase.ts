// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-i2s1r9Du1TeOMVZw_JhkwRNGwjiHdZ0",
    authDomain: "raz-spaceapp.firebaseapp.com",
    projectId: "raz-spaceapp",
    storageBucket: "raz-spaceapp.appspot.com",
    messagingSenderId: "759383253719",
    appId: "1:759383253719:web:5ba299d8664e01dd258692",
    measurementId: "G-RJ6CS0WSC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
