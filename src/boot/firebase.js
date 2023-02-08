import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyC8gH3sYyd14_SPtDzr9gc8n5QF78frP30",
  authDomain: "e-learning-mysql.firebaseapp.com",
  projectId: "e-learning-mysql",
  storageBucket: "e-learning-mysql.appspot.com",
  messagingSenderId: "828304489450",
  appId: "1:828304489450:web:9ee765f1c972cbed871093"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);
const functions = getFunctions(app);

export { db, auth, storage, functions };
