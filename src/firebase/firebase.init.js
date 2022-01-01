import firebaseConfig from "./firebase.config.js";
import { initializeApp } from "firebase/app";

function firebaseInit() {
  initializeApp(firebaseConfig);
}

export default firebaseInit;
