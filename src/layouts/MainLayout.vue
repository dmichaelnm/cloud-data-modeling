<!--suppress JSUnresolvedReference -->
<template>
  <!-- Main Layout -->
  <q-layout view="lHh Lpr lFf">
    <!-- Change Password Dialog -->
    <change-password-dialog v-model="chgPwdDlgVisible"/>

    <!-- Header -->
    <q-header>
      <!-- Header Toolbar -->
      <q-toolbar>
        <!-- Application Title -->
        <q-toolbar-title>{{ $t("application.title") }}</q-toolbar-title>
        <!-- Space -->
        <q-space/>
        <!-- Account Menu Button -->
        <q-btn flat round icon="person">
          <!-- Account Menu -->
          <q-menu>
            <q-list>
              <!-- Account Name Item -->
              <q-item dense class="account-menu-header">
                <!-- Account Name Section -->
                <q-item-section>
                  <!-- Account Name Label -->
                  <q-item-label class="text-center text-bold">
                    {{ session.account.data.profile.firstName + " " + session.account.data.profile.lastName }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- Separator -->
              <q-separator/>
              <!-- Dark Mode Item -->
              <q-item dense clickable v-close-popup @click="switchDarkMode">
                <!-- Dark Mode Icon Section -->
                <q-item-section avatar>
                  <!-- Dark Mode Icon -->
                  <q-icon :name="session.account.data.preferences.darkMode ? 'light_mode' : 'dark_mode'" size="xs"/>
                </q-item-section>
                <!-- Dark Mode Label Section -->
                <q-item-section>
                  <q-item-label>
                    {{ session.account.data.preferences.darkMode ? $t("button.lightMode") : $t("button.darkMode") }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- Language Item -->
              <q-item dense clickable>
                <!-- Language Icon Section -->
                <q-item-section avatar>
                  <!-- Language Icon -->
                  <q-icon name="language" size="xs"/>
                </q-item-section>
                <!-- Language Label Section -->
                <q-item-section>
                  <!-- Language Label -->
                  <q-item-label>{{ $t("button.language") }}</q-item-label>
                </q-item-section>
                <!-- Language Sub Menu -->
                <q-menu anchor="top right">
                  <q-list>
                    <!-- Language Option Item -->
                    <q-item dense v-for="opt in getLanguageOptions($t)" :key="opt.value" class="language-menu"
                            clickable v-close-popup @click="switchLanguage(opt.value)">
                      <!-- Language Icon Section -->
                      <q-item-section avatar>
                        <!-- Language Icon -->
                        <q-icon :name="getLanguageOption($t, opt.value)?.icon" size="xs"/>
                      </q-item-section>
                      <!-- Language Label Section -->
                      <q-item-section>
                        <!-- Language Label -->
                        <q-item-label>{{ opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <!-- Separator -->
              <q-separator/>
              <!-- Change Password Item -->
              <q-item dense clickable v-close-popup @click="chgPwdDlgVisible = true">
                <!-- Empty Icon Section -->
                <q-item-section avatar/>
                <!-- Change Password Label Section -->
                <q-item-section>
                  <!-- Change Password Label -->
                  <q-item-label> {{ $t("button.changePassword") }}</q-item-label>
                </q-item-section>
              </q-item>
              <!-- Separator -->
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
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
  </q-layout>
</template>

<style lang="scss">
.account-menu-header {
  background-color: $light-frame;
  width: 200px;
}

.body--dark .account-menu-header {
  background-color: $dark-frame;
}

.language-menu {
  width: 200px;
}
</style>

<script>
import {Account} from "src/scripts/objects/Account";
import {getLanguageOptions, getLanguageOption} from "src/scripts/options";
import BasicMixin from "src/mixins/BasicMixin";
import ChangePasswordDialog from "src/dialogs/ChangePasswordDialog.vue";

export default {
  // The name of this layout.
  name: "MainLayout",
  components: {ChangePasswordDialog},

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
        // Apply the preferred language
        if (this.$i18n) {
          this.$i18n.locale = account.data.preferences.language;
        }
        // Apply the preferred dark mode
        this.q.dark.set(account.data.preferences.darkMode);
      }
      // Unlock screen
      this.q.loading.hide();
    });
  },

  // The variables of this layout
  data() {
    return {
      // Language functions
      getLanguageOption: getLanguageOption,
      getLanguageOptions: getLanguageOptions,
      // Change Password Dialog
      chgPwdDlgVisible: false
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
    },

    /**
     * Switches the dark mode of the application on or off.
     */
    switchDarkMode() {
      // Set the new dark mode
      this.q.dark.set(!this.q.dark.isActive);
      // Set dark mode on account
      this.session.account.data.preferences.darkMode = this.q.dark.isActive;
      // Set cookie for dark mode
      this.q.cookies.set("darkMode", this.q.dark.isActive ? "true" : "false", {expires: 365});
      // Update account
      this.session.account.update();
    },

    /**
     * Switches the language of the application to the specified language.
     *
     * @param {string} language - The language code representing the desired language.
     */
    switchLanguage(language) {
      // Set the new language
      this.$i18n.locale = language;
      // Set language on account
      this.session.account.data.preferences.language = language;
      // Set cookie for language
      this.q.cookies.set("language", language, {expires: 365});
      // Update account
      this.session.account.update();
    }
  }
}
</script>
