// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcvl0_nhdARhye8VyYAbfY-efWz4IKERw",
  authDomain: "my-chat-app-3ac7d.firebaseapp.com",
  projectId: "my-chat-app-3ac7d",
  storageBucket: "my-chat-app-3ac7d.appspot.com",
  messagingSenderId: "497026231196",
  appId: "1:497026231196:web:16abae4baa9a9c90d77659",
  measurementId: "G-WWDCCZ6ME2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
