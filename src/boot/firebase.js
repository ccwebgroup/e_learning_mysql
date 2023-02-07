import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBOsBDEFSTVR9zSOu0iHzIODWgfIIsD1Ek",
  authDomain: "ccs-repo.firebaseapp.com",
  projectId: "ccs-repo",
  storageBucket: "ccs-repo.appspot.com",
  messagingSenderId: "1508424018",
  appId: "1:1508424018:web:8e97c8097404d7960b628b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);
const functions = getFunctions(app);

export { db, auth, storage, functions };
