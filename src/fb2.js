import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR35NLabbpyIzpr_-tpXn8z8xlcj2aAoQ",
  authDomain: "test-6912a.firebaseapp.com",
  databaseURL: "https://test-6912a.firebaseio.com",
  projectId: "test-6912a",
  storageBucket: "test-6912a.appspot.com",
  messagingSenderId: "705460843359",
  appId: "1:705460843359:web:10ee2ff551e58a6dd9bcea",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

//const studentRef = database.ref("Student");

export default db;
