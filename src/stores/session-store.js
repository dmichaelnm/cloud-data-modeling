import {defineStore} from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /**
     * Current account.
     * @type {Account}
     */
    account: null,
    /**
     * ID of the editor item.
     * @type {string}
     */
    editorItemId: null,
    /**
     * Flag indicating whether there is an open editor.
     * @type {boolean}
     */
    editorLock: false,
    /**
     * List of all projects of the current account
     * @type {Project[]}
     */
    projectList: []
  }),
  getters: {},
  actions: {
    /**
     * Sets the account for the user.
     *
     * @param {Account} account - The account object to be set for the user.
     */
    setAccount(account) {
      this.account = account;
    },
    /**
     * Sets the ID of the item for the editor.
     *
     * @param {string?} editorItemId Item ID
     */
    setEditorItemId(editorItemId) {
      this.editorItemId = editorItemId;
    },
    /**
     * Sets the editor lock.
     *
     * @param {boolean} lock - A boolean value indicating whether the editor should be locked or not.
     */
    setEditorLock(lock) {
      this.editorLock = lock;
    },
    /**
     * Sets the project list to the provided array of projects.
     *
     * @param {Project[]} projects - An array of projects to set as the new project list.
     */
    setProjects(projects) {
      this.projectList = projects;
    }
  }
});
