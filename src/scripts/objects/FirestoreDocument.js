import {firebaseAuth, firestore} from "src/scripts/firebase";
import {deleteDoc, doc, Timestamp, updateDoc} from "firebase/firestore";

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

  async delete() {
    // Call beforeDelete
    await this.beforeDelete();
    // Create document reference
    const docRef = doc(firestore, this.path, this.id);
    // Delete the document
    await deleteDoc(docRef);
  }

  /**
   * Performs actions before deleting the document.
   */
  async beforeDelete() {}

  /**
   * Updates the document in Firestore.
   *
   * @param {boolean} updateMeta When true, the meta attributes "alteredBy" and "alteredAt" will be set.
   */
  async update(updateMeta = false) {
    if (updateMeta) {
      // Update meta attributes
      const data = this.getData();
      data.meta.alteredBy = firebaseAuth.currentUser.displayName;
      data.meta.alteredAt = Timestamp.now();
    }
    // Call beforeUpdate
    await this.beforeUpdate();
    // Create document reference
    const docRef = doc(firestore, this.path, this.id);
    // Update the document
    await updateDoc(docRef, this.getData())
  }

  /**
   * Performs actions before updating the document.
   */
  async beforeUpdate() {}
}
