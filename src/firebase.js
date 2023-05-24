import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDhOTXTQVJ_W9jm6QE9xWVHX3qpVH7XjLk",
  authDomain: "crud-ab315.firebaseapp.com",
  projectId: "crud-ab315",
  storageBucket: "crud-ab315.appspot.com",
  messagingSenderId: "953569083182",
  appId: "1:953569083182:web:08100771a8e5e77b16c4bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}