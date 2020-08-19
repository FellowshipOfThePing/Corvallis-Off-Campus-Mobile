import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBGDIgPgIsBnejcAi3l8AMw9tX6N37yIgk",
  authDomain: "housing-app-a4ab5.firebaseapp.com",
  databaseURL: "https://housing-app-a4ab5.firebaseio.com",
  projectId: "housing-app-a4ab5",
  storageBucket: "housing-app-a4ab5.appspot.com",
  messagingSenderId: "214259960500",
  appId: "1:214259960500:web:7f4e495b7f85d0094e65e1",
};

let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
