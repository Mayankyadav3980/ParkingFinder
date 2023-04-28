import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOMwSq2A11bV-LczsgqtkCCaVDSnVHAaM",
  authDomain: "parkingfinder-554b3.firebaseapp.com",
  projectId: "parkingfinder-554b3",
  storageBucket: "parkingfinder-554b3.appspot.com",
  messagingSenderId: "922672172989",
  appId: "1:922672172989:web:400552c8107cbfdb194cd4",
  measurementId: "G-XS6G8J7Z8P",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
