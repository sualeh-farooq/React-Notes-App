import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBAG_J1PGZu0ahsH9uIa-O48fFjqMAo85M",
  authDomain: "notes-app-ca9e2.firebaseapp.com",
  projectId: "notes-app-ca9e2",
  storageBucket: "notes-app-ca9e2.appspot.com",
  messagingSenderId: "559487367364",
  appId: "1:559487367364:web:69622807d2cee26bd7b191"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export {database , app}