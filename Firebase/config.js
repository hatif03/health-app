// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYFDLIk9eMPVKfkLra5TU1-PiMixowRIQ",
  authDomain: "gymbros-a5e76.firebaseapp.com",
  projectId: "gymbros-a5e76",
  storageBucket: "gymbros-a5e76.appspot.com",
  messagingSenderId: "854945118712",
  appId: "1:854945118712:web:73b0c8df94ebd3e7fb3e0d",
  measurementId: "G-DJ1P2E3PJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)