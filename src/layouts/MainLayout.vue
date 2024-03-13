<!--suppress JSUnresolvedReference -->
<template>
  <!-- Main Layout -->
  <q-layout view="lHh Lpr lFf">

  </q-layout>
</template>

<script>
import {Account} from "src/scripts/objects/Account";

export default {
  // The name of this layout.
  name: "MainLayout",

  // Called before this layout is created.
  beforeCreate() {
    // Catch changes for the current account.
    Account.onAccountStateChanged((account) => {
      if (account === null) {
        // No authorized account found, redirect to login page.
        this.$router.push({path: "/auth/login"});
      }
    });
  }
}
</script>
