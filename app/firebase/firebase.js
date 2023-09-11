import 'dotenv/config';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.API_KEY,
  authDomain: process.AUTH_DOMAIN,
  projectId: process.PROJECT_ID,
  storageBucket: process.STORAGE_BUCKET,
  messagingSenderId: process.MESSAGING_SENDER_ID,
  appId: process.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);