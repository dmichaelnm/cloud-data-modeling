<!--suppress JSUnresolvedReference, JSCheckFunctionSignatures, JSValidateTypes -->
<template>
  <!-- Main Layout -->
  <q-layout view="hHh Lpr fFf">
    <!-- Change Password Dialog -->
    <change-password-dialog v-model="chgPwdDlgVisible"/>
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"
                    :buttons="messageDialog.buttons"
                    @dialog-closed="onMessageDialogClosed"/>

    <!-- Header -->
    <q-header>
      <!-- Header Toolbar -->
      <q-toolbar>
        <!-- Left Drawer Menu Icon -->
        <q-btn round flat icon="menu" @click="leftDrawer = !leftDrawer"/>
        <!-- Application Title -->
        <q-toolbar-title>{{ $t("application.title") }}</q-toolbar-title>
        <!-- Space -->
        <q-space/>
        <!-- Account Menu Button -->
        <q-btn flat round icon="person">
          <!-- Account Menu -->
          <q-menu>
            <!-- List -->
            <q-list>
              <!-- Account Name Item -->
              <c-menu-item item-class="account-menu-header" label-class="text-center text-bold"
                           :label="session.account.data.profile.firstName + ' ' + session.account.data.profile.lastName"/>
              <!-- Separator -->
              <q-separator/>
              <!-- Dark Mode Item -->
              <c-menu-item clickable v-close-popup @click="switchDarkMode"
                           :icon="session.account.data.preferences.darkMode ? 'light_mode' : 'dark_mode'"
                           :label="session.account.data.preferences.darkMode ? $t('button.lightMode') : $t('button.darkMode')"/>

              <!-- Language Item -->
              <c-menu-item clickable icon="language" :label="$t('button.language')">
                <!-- Language Sub Menu -->
                <q-menu anchor="top right">
                  <q-list>
                    <c-menu-item v-for="opt in getLanguageOptions($t)" :key="opt.value" item-class="language-menu"
                                 clickable v-close-popup @click="switchLanguage(opt.value)"
                                 :icon="getLanguageOption($t, opt.value)?.icon"
                                 :label="opt.label"/>
                  </q-list>
                </q-menu>
              </c-menu-item>
              <!-- Separator -->
              <q-separator/>
              <!-- Change Password -->
              <c-menu-item clickable v-close-popup empty-icon @click="chgPwdDlgVisible = true"
                           :label="$t('button.changePassword')"/>
              <!-- Separator -->
              <q-separator/>
              <!-- Logout Item -->
              <c-menu-item clickable v-close-popup icon="logout" @click="signOut" :label="$t('button.logout')"/>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawer"
              show-if-above
              :mini="leftDrawerMiniState"
              @mouseover="leftDrawerMiniState = false"
              @mouseout="leftDrawerMiniState=true"
              mini-to-overlay
              :width="200"
              :breakpoint="500"
              bordered>
      <!-- Scroll Area -->
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <!-- List -->
        <q-list padding>

          <!-- Dashboard -->
          <c-drawer-item scope="project" :label="$t('leftDrawer.project')" icon="mdi-notebook-outline"
                         @click="switchPage"/>

        </q-list>
      </q-scroll-area>

    </q-drawer>

    <!-- Footer -->
    <q-footer>
      <!-- Footer Toolbar -->
      <q-toolbar>
        <!-- Left Space -->
        <q-space/>
        <!-- Copyright, Version and Social Media -->
        <div>
          <!-- Copyright and Version Row -->
          <div class="row">
            <!-- Copyright and Version Column -->
            <div class="col text-center">
              <span v-html="$t('application.copyright')"/>
              {{ $t("application.version", {major: version.major, minor: version.minor, build: version.build}) }}
            </div>
          </div>
          <!-- Social Media Row -->
          <div class="row">
            <div class="col text-center">
              <!-- Email -->
              <q-btn round flat size="xs" icon="mdi-email"
                     target="_blank" href="mailto:dirkmichaelnm@gmail.com?subject=Cloud%20Data%20Modeling"/>
              <!-- Discord -->
              <q-btn round flat size="xs" icon="mdi-discord"
                     target="_blank" href="https://discord.gg/d3xDh8N4Vu"/>
              <!-- Twitter -->
              <q-btn round flat size="xs" icon="mdi-twitter"
                     target="_blank" href="https://www.twitter.com/dmic2501"/>
              <!-- Instagram -->
              <q-btn round flat size="xs" icon="mdi-instagram"
                     target="_blank" href="https://www.instagram.com/dirk_michael_nm"/>
              <!-- Twitch -->
              <q-btn round flat size="xs" icon="mdi-twitch"
                     target="_blank" href="https://twitch.tv/khrenn"/>
            </div>
          </div>
        </div>
        <!-- Right Space -->
        <q-space/>
      </q-toolbar>
    </q-footer>

    <!-- Page Container -->
    <q-page-container>
      <!-- Router View -->
      <router-view/>
    </q-page-container>
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
import {version} from "src/scripts/version";
import BasicMixin from "src/mixins/BasicMixin";
import ChangePasswordDialog from "src/dialogs/ChangePasswordDialog.vue";
import CDrawerItem from "components/common/CDrawerItem.vue";
import CMenuItem from "components/common/CMenuItem.vue";
import MessageDialog from "src/dialogs/MessageDialog.vue";

export default {
  // The name of this layout.
  name: "MainLayout",

  // The components used by this layout.
  components: {
    MessageDialog,
    CMenuItem,
    ChangePasswordDialog,
    CDrawerItem
  },

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
        // Route to project page
        this.$router.push({path: "/project"});
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
      chgPwdDlgVisible: false,
      // Version
      version: version,
      // Left Drawer
      leftDrawer: true,
      leftDrawerMiniState: true
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
    },

    /**
     * This method is used to switch the current page to the given page.
     * If the editor is locked, it will show a warning dialog and prompt the user to discard the changes.
     * Otherwise, it will redirect the user to the specified page.
     *
     * @param {String} page - The page to switch to.
     */
    switchPage(page) {
      // Check, if editor is locked
      if (this.session.editorLock) {
        // Show warning dialog
        this.showWarningDialog(
          "discard",
          this.$t("dialog.discardEditor.title"),
          this.$t("dialog.discardEditor.message"),
          undefined,
          page,
          [{value: "yes", label: "button.yes"}, {value: "no", label: "button.no"}]
        );
      } else {
        // Redirect to page
        this.$router.push({path: "/" + page});
      }
    },

    /**
     * This method is called when the message dialog of this page was closed.
     * @param {{value:string, action:string, data:*}} event The event data.
     */
    onMessageDialogClosed(event) {
      // Discard changes dialog
      if (event.action === "discard") {
        // User said yes, so redirect to target page
        if (event.value === "yes") {
          this.$router.push({path: "/" + event.data});
        }
      }
    }
  }
}
</script>
