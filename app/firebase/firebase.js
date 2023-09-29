import 'dotenv/config';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKLmQ6ucKGh-Hjo9ZM4eezhvSrFNRtJvs",
  authDomain: "not-in-vein.firebaseapp.com",
  projectId: "not-in-vein",
  storageBucket: "not-in-vein.appspot.com",
  messagingSenderId: "672012263493",
  appId: "1:672012263493:web:7da2f30dc9bf92afa5832c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);