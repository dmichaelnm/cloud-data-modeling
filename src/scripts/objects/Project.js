import {FirestoreDocument} from "src/scripts/objects/FirestoreDocument";
import {addDoc, collection, getDocs, query, Timestamp, where} from "firebase/firestore";
import {firebaseAuth, firestore} from "src/scripts/firebase";
import {Account} from "src/scripts/objects/Account";

export class Project extends FirestoreDocument {

  /**
   * Creates a new project in Firestore.
   *
   * @param {*} data - The data for the new project.
   * @return {Promise<Project>} - A promise that resolves with the created project object.
   */
  static async create(data) {
    // Append meta attributes to the data structure
    data.meta = {
      createdAt: Timestamp.now(),
      createdBy: firebaseAuth.currentUser.displayName
    };
    // Append access rights
    const access = [];
    access.push(data.owner);
    access.push(data.manager);
    access.push(...data.members.map(mbr => mbr.accountId));
    data.access = [...new Set(access)];
    // Create collection reference for the new project
    const coll = collection(firestore, "project");
    // Add document to firestore with the given data
    const docRef = await addDoc(coll, data);
    // Create and return project object
    return new Project(docRef.path, data);
  }

  /**
   * Loads projects from Firestore based on current user's access.
   *
   * @return {Promise<Project[]>} A promise that resolves to an array of loaded projects.
   */
  static async loadProjects() {
    // Create query
    const qry = query(
      collection(firestore, "project"),
      where("access", "array-contains", firebaseAuth.currentUser.uid)
    );
    // Get snapshot from firestore for the query
    const snapshot = await getDocs(qry);
    // Create project array
    const projects = [];
    // Iterate over all documents
    for (let i = 0; i < snapshot.size; i++) {
      // Get document
      const doc = snapshot.docs[i];
      // Create project
      const project = new Project(doc.ref.path, doc.data());
      // Initialize project
      await project.init();
      // Add the project to the array
      projects.push(project);
    }
    // Return the array of loaded projects
    return projects;
  }

  /**
   * The data structure of a project.
   * @type {{name:string, description?:string, owner:string, manager:string,
   *         members:{accountId:string, role:string}[],
   *         attributes:{name:string, type:string, value:string}[]}}
   */
  data

  /**
   * The name of the owner.
   * @type {string}
   */
  ownerName

  /**
   * The name of the manager.
   * @type {string}
   */
  managerName

  /**
   * The role of the current account in this project.
   * @type {string}
   */
  role

  constructor(path, data) {
    super(path);
    this.data = data;
  }

  /**
   * Returns the project data structure.
   *
   * @return {{name:string, description?:string, owner:string, manager:string,
   *         members:{accountId:string, role:string}[],
   *         attributes:{name:string, type:string, value:string}[]}} The project data structure.
   */
  getData() {
    return this.data;
  }

  async init() {
    // Get owner account
    const ownerAccount = await Account.getAccountById(this.data.owner);
    // Initialize owner name
    this.ownerName = ownerAccount.data.profile.firstName + " " + ownerAccount.data.profile.lastName;
    // Get manager account
    const managerAccount = await Account.getAccountById(this.data.manager);
    // Initialize manager name
    this.managerName = managerAccount.data.profile.firstName + " " + managerAccount.data.profile.lastName;
    // Get own role in the project
    if (this.data.owner === firebaseAuth.currentUser.uid) {
      // If I'm the owner my role is also owner
      this.role = "owner";
    } else {
      // Find the member entry
      const member = this.data.members.find(
        mbr => mbr.accountId === firebaseAuth.currentUser.uid);
      // Apply role
      this.role = member.role;
    }
  }
}
