import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyAmUxTq1pAYEFYHC8PytBrBMMa8z0dP62Q",
  authDomain: "gradtracker-361db.firebaseapp.com",
  databaseURL: "https://gradtracker-361db.firebaseio.com",
  projectId: "gradtracker-361db",
  storageBucket: "gradtracker-361db.appspot.com",
  messagingSenderId: "312349194926",
  appId: "1:312349194926:web:c0f280c7059486fab1cb3f",
  measurementId: "G-QC4X1FW79T",
};
// Initialize Firebase
firebase.initializeApp(config);
//firebase.analytics();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

//const studentRef = database.ref("Student");

export default db;
