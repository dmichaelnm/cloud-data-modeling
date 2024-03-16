<!--suppress JSUnresolvedReference -->
<template>
  <!-- Main Layout -->
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header>
      <!-- Header Toolbar -->
      <q-toolbar>
        <!-- Space -->
        <q-space/>
        <!-- Account Menu Button -->
        <q-btn flat round icon="person">
          <!-- Account Menu -->
          <q-menu>
            <!-- Account Name Item -->
            <q-item dense>
              <!-- Account Name Section -->
              <q-item-section>
                <!-- Account Name Label -->
                <q-item-label class="text-center text-bold">{{ accountName }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator/>
            <!-- Logout Item -->
            <q-item dense clickable v-close-popup @click="signOut">
              <!-- Logout Item Icon Section -->
              <q-item-section avatar>
                <!-- Logout Item -->
                <q-icon name="logout" size="xs"/>
              </q-item-section>
              <!-- Logout Item Label Section -->
              <q-item-section>
                <!-- Logout Label -->
                <q-item-label>{{ $t("button.logout") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
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
        // Set account on session store
        this.session.setAccount(account);
        this.accountName = account.getDisplayName();
      }
      // Unlock screen
      this.q.loading.hide();
    });
  },

  // The variables of this layout
  data() {
    return {
      // The name of authorized account
      accountName: null
    }
  },

  // The methods of this layout
  methods: {
    /**
     * Signs out the current user.
     */
    async signOut() {
      // Logout the current firebase user.
      await Account.logout();
    }
  }
}
</script>
