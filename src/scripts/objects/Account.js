import {FirestoreDocument} from "src/scripts/objects/FirestoreDocument";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "src/scripts/firebase";

export class Account extends FirestoreDocument {

  static async onAccountStateChanged(handler) {
    // Catch changes in the firebase authentication state.
    let user;
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
}
