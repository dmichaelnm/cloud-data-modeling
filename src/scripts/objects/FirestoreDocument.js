import {firestore} from "src/scripts/firebase";
import {doc, updateDoc} from "firebase/firestore";

export class FirestoreDocument {

  /**
   * The ID of the firestore document.
   * @type string
   */
  id

  /**
   * The path of the document in firestore.
   * @type string
   */
  path

  /**
   * Creates a new firestore document object.
   * @param {string} path The path to the firestore document.
   */
  constructor(path) {
    // Extract ID and path
    const parts = path.split('/');
    this.id = parts.pop();
    this.path = parts.join('/');
  }

  /**
   * Returns the data structure of this firestore document.
   * @return {*} The data structure.
   */
  getData() {
    throw new Error("This is an abstract method");
  }

  /**
   * Updates the document in Firestore.
   */
  async update() {
    // Create document reference
    const docRef = doc(firestore, this.path, this.id);
    // Update the document
    await updateDoc(docRef, this.getData())
  }
}
