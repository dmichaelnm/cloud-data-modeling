import {FirestoreDocument} from "src/scripts/objects/FirestoreDocument";
import {firebaseAuth, firestore} from "src/scripts/firebase";
import {onAuthStateChanged, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

export class Account extends FirestoreDocument {

  static async onAccountStateChanged(handler) {
    // Catch changes in the firebase authentication state.
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user === null) {
        // No authenticated user found.
        handler(null);
      } else {
        // TODO Load the account object for the authenticated firebase user.
        handler(null);
      }
    });
  }

  static async create(firstName, lastName, email, password, language, darkMode) {
    // Create the firebase account
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    // Update the first name and last name.
    await updateProfile(credential.user, {displayName: firstName + " " + lastName});
    // Create firestore document reference for the new account
    const docRef = doc(firestore, "account", credential.user.uid);
    // Create the data structure
    const data = {
      profile: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
      preferences: {
        language: language,
        darkMode: darkMode
      }
    };
    // Create the firestore document
    await setDoc(docRef, data);
    // Create the account
    return new Account(docRef.path, data);
  }

  constructor(path, data) {
    super(path, data);
  }
}
