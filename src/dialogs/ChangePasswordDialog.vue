<!--suppress JSUnresolvedReference -->
<template>
  <!-- ChangePasswordDialog Dialog -->
  <c-dialog ref="dialog"
            v-model="visible"
            :width="400"
            :title="$t('changePasswordDialog.title')"
            :buttons="[{value:'ok', label:'button.okay'},{value:'cancel', label:'button.cancel'}]"
            @before-show="onBeforeShow" @dialog-closed="onDialogClosed">
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"
                    @dialog-closed="onMessageDialogClosed"/>

    <!-- Form -->
    <q-form ref="form" greedy>
      <!-- Because chrome browser wants it -->
      <input class="visibility: hidden" autocomplete="username"/>
      <!-- Form Div -->
      <div class="q-col-gutter-y-sm">
        <!-- Message Row -->
        <div class="row" style="height: 80px">
          <!-- Message Column -->
          <div class="col">{{ $t("changePasswordDialog.message") }}</div>
        </div>
        <!-- Old Password Row -->
        <div class="row">
          <!-- Old Password Column -->
          <div class="col">
            <!-- Old Password Input -->
            <c-input ref="inputOldPassword" v-model="oldPassword" :label="$t('changePasswordDialog.label.oldPassword')"
                     :error-message="oldPasswordError" mandatory auto-focus type="password"
                     auto-complete="current-password" @keyup.enter="onSubmit"/>
          </div>
        </div>
        <!-- New Password Row -->
        <div class="row">
          <!-- New Password Column -->
          <div class="col">
            <!-- New Password Input -->
            <c-input ref="inputNewPassword" v-model="newPassword" :label="$t('changePasswordDialog.label.newPassword')"
                     :error-message="newPasswordError" mandatory type="password" auto-complete="new-password"
                     @keyup.enter="onSubmit"/>
          </div>
        </div>
        <!-- Repeat Password Row -->
        <div class="row">
          <!-- Repeat Password Column -->
          <div class="col">
            <!-- Repeat Password Input -->
            <c-input ref="inputRepeatPassword" v-model="repeatPassword" :label="$t('common.passwordRepeat')"
                     :error-message="repeatPasswordError" mandatory type="password" auto-complete="new-password"
                     @keyup.enter="onSubmit"/>
          </div>
        </div>
      </div>
    </q-form>
  </c-dialog>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CDialog from "components/common/CDialog.vue";
import CInput from "components/common/CInput.vue";
import MessageDialog from "src/dialogs/MessageDialog.vue";

export default {
  // This is the name of this dialog.
  name: "ChangePasswordDialog",

  // The used mixins of this dialog.
  mixins: [
    BasicMixin
  ],

  // The used components of this dialog.
  components: {
    MessageDialog,
    CDialog,
    CInput
  },

  // The public attributes of this dialog.
  props: {},

  // The variables of this dialog.
  data() {
    return {
      // Visibility of the dialog.
      visible: false,
      // Old Password
      oldPassword: "",
      oldPasswordError: null,
      // New Password
      newPassword: "",
      newPasswordError: null,
      // Repeat Password
      repeatPassword: "",
      repeatPasswordError: null
    }
  },

  // Called before this page is mounted.
  beforeMount() {
  },

  // The methods of this page.
  methods: {
    /**
     * This method is called when a dialog is closed.
     *
     * @param {CDialog} dialog - The dialog that was closed.
     * @param {string} value - The value that was passed when closing the dialog.
     *                           Possible values are 'cancel' or 'okay'.
     */
    async onDialogClosed(dialog, value) {
      if (value === "cancel") {
        // Close dialog without doing anything
        dialog.hide();
      } else {
        // Submit the form
        await this.onSubmit();
      }
    },

    /**
     * Handles the form submission when changing the password.
     */
    async onSubmit() {
      // Reset error message
      this.resetErrorMessages();

      // Check new password
      if (this.newPassword !== this.repeatPassword) {
        this.repeatPasswordError = this.$t("authentication.register.error.passwordCheck");
        return;
      }

      // Validate the form
      if (await this.$refs.form.validate()) {
        // Start the change password process
        await this.run(
          this.$t,
          async (t) => {
            // Change the password
            await this.session.account.changePassword(this.oldPassword, this.newPassword);
            // Show success dialog
            this.showSuccessDialog(
              "success",
              t("changePasswordDialog.success.title"),
              t("changePasswordDialog.success.message")
            );
          },
          (t, error) => {
            // Get the error code
            const code = error.code;
            // Password too weak.
            if (code === "auth/weak-password") {
              this.newPasswordError = t("authentication.register.error.weakPassword");
              return false;
            }
            // Invalid credentials
            if (code === "auth/invalid-credential") {
              this.oldPasswordError = t("changePasswordDialog.error.invalidPassword");
              return false;
            }
            return true;
          }
        );
      }
    },

    /**
     * Is called before this dialog is shown.
     */
    onBeforeShow() {
      // Empty the old password field
      this.oldPassword = "";
      this.newPassword = "";
      this.repeatPasswordError = "";
      // Reset error messages
      this.resetErrorMessages();
    },

    /**
     * Handles the closing of a message dialog.
     */
    onMessageDialogClosed() {
      // Close the dialog
      this.$refs.dialog.close();
    },

    /**
     * Reset the error messages.
     */
    resetErrorMessages() {
      this.oldPasswordError = null;
      this.newPasswordError = null;
      this.repeatPasswordError = null;
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
