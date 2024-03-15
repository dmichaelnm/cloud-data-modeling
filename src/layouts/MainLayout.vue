<!--suppress JSUnresolvedReference -->
<template>
  <!-- Main Layout -->
  <q-layout view="lHh Lpr lFf">

  </q-layout>
</template>

<script>
import {Account} from "src/scripts/objects/Account";
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // The name of this layout.
  name: "MainLayout",

  // The used mixins of this layout.
  mixins: [
    BasicMixin
  ],

  // Called before this layout is created.
  beforeCreate() {
    // Catch changes for the current account.
    Account.onAccountStateChanged((account) => {
      // Lock the screen
      this.q.loading.show();
      if (account === null) {
        // No authorized account found, redirect to login page.
        this.$router.push({path: "/auth/login"});
      } else {

      }
      // Unlock screen
      this.q.loading.hide();
    });
  }
}
</script>
