import {defineStore} from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /**
     * Current account.
     * @type {Account}
     */
    account: null
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
    }
  }
});
