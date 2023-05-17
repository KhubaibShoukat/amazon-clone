
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJaS-tzhSP-g-yqnu7qUUP7cZW__Zu4zA",
  authDomain: "clone-9b15a.firebaseapp.com",
  projectId: "clone-9b15a",
  storageBucket: "clone-9b15a.appspot.com",
  messagingSenderId: "148816037922",
  appId: "1:148816037922:web:bfbdda20e69550b217e27b",
  measurementId: "G-FJRJ61893F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }