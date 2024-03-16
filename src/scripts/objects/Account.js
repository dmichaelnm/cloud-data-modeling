import {FirestoreDocument} from "src/scripts/objects/FirestoreDocument";
import {firebaseAuth, firestore} from "src/scripts/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import {doc, getDoc, setDoc, Timestamp} from "firebase/firestore";

/**
 * Represents an account in the system.
 * @extends FirestoreDocument
 */
export class Account extends FirestoreDocument {

  /**
   * Handles changes in the account state.
   *
   * @param {function} handler - The callback function to be called when the account state changes.
   */
  static async onAccountStateChanged(handler) {
    // Catch changes in the firebase authentication state.
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user === null) {
        // No authenticated user found.
        handler(null);
      } else {
        // Load the account object for the authenticated firebase user.
        const account = await Account.getAccount(user.uid);
        if (account) {
          // Check lock state.
          if (account.isLocked()) {
            // Account is locked.
            handler(null);
          } else {
            // Account is valid and authorized.
            handler(account);
          }
        } else {
          // No account found for the ID.
          handler(null);
        }
      }
    });
  }

  /**
   * Creates a new user account with the given information.
   *
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password for the user.
   * @param {string} language - The preferred language of the user.
   * @param {boolean} darkMode - Whether the user prefers dark mode or not.
   * @returns {Promise<Account>} A Promise that resolves to the newly created Account object.
   */
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
      },
      states: {
        locked: true
      },
      meta: {
        createdAt: Timestamp.now(),
        navigator: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          doNotTrack: navigator.doNotTrack
        }
      }
    };
    // Create the firestore document
    await setDoc(docRef, data);
    // Create the account
    return new Account(docRef.path, data);
  }

  /**
   * Resets the password for a user and sends a password reset email.
   *
   * @param {string} email - The email address of the user.
   */
  static async resetPassword(email) {
    // Request the email
    await sendPasswordResetEmail(firebaseAuth, email);
  }

  /**
   * Logs in a user with the given email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @return {Promise<Account>} A promise that resolves to the user's account object.
   * @throws {{code:string, message:string}} Throws an error object if an error occurs during the login process.
   */
  static async login(email, password) {
    // Sign in
    const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
    // Get the account object
    const account = await Account.getAccount(credentials.user.uid);
    if (account) {
      // Check the locked state
      if (!account.isLocked()) {
        // Everything is okay.
        return account;
      } else {
        // Logout firestore user
        await Account.logout();
        // Account is locked.
        throw {code: "auth/account-is-locked", message: "The account is locked."};
      }
    } else {
      // No account found for the user.
      throw {code: "auth/account-not-found", message: "The firestore account object was not found."};
    }
  }

  /**
   * Logs out the current user.
   */
  static async logout() {
    // Sign out firebase account
    await signOut(firebaseAuth);
  }

  /**
   * Retrieves an account from the firestore based on the provided ID.
   *
   * @param {string} id - The ID of the account to retrieve.
   * @return {Promise<undefined|Account>} - A Promise that resolves to either the retrieved Account object, if found,
   *                                        or undefined if no document with the provided ID was found.
   */
  static async getAccount(id) {
    // Create firestore document reference for the account ID
    const docRef = doc(firestore, "account", id);
    // Load document from firestore
    const document = await getDoc(docRef);
    if (document.exists()) {
      // Create account object
      return new Account(docRef.path, document.data());
    }
    // No document with the ID was found.
    return undefined;
  }

  /**
   * The account data.
   * @type {{profile:{firstName:string, lastName:string, email:string},
   *         preferences:{language:string, darkMode:boolean},
   *         states:{locked:boolean}}}
   */
  data

  /**
   * Creates an instance of the account.
   *
   * @param {string} path - The path to the firestore document of the account.
   * @param {any} data - The data for the account.
   */
  constructor(path, data) {
    super(path);
    this.data = data;
  }

  /**
   * Retrieves the display name of the user.
   *
   * @return {string} The full name of the user.
   */
  getDisplayName() {
    return this.data.profile.firstName + " " + this.data.profile.lastName;
  }

  /**
   * Checks whether the account is currently locked.
   *
   * @return {boolean} Returns true if the account is locked, false otherwise.
   */
  isLocked() {
    return this.data.states.locked;
  }
}
