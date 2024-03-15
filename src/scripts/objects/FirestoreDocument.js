import {firestore} from "src/scripts/firebase";
import {doc} from "firebase/firestore";

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

  constructor(path) {
    // Extract ID and path
    const parts = path.split('/');
    this.id = parts.pop();
    this.path = parts.join('/');
  }
}
