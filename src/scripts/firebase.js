import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {firebaseConfig} from "src/secrets/firebase";

// Initialize firebase application.
const firebaseApp = initializeApp(firebaseConfig);

// Get firebase authentication service.
export const firebaseAuth = getAuth(firebaseApp);

// Get firestore
export const firestore = getFirestore(firebaseApp);
