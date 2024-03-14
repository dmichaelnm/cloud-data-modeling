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
   * The data of the firestore document.
   * @type any
   */
  data

  constructor(path, data) {
    // Store the data
    this.data = data;
    // Extract ID and path
    const parts = path.split('/');
    this.id = parts.pop();
    this.path = parts.join('/');
  }
}