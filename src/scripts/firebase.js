import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "src/secrets/firebase";

// Initialize firebase application.
const firebaseApp = initializeApp(firebaseConfig);

// Get firebase authentication service.
export const firebaseAuth = getAuth(firebaseApp);
