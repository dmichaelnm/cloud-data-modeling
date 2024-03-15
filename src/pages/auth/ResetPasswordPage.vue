<!--suppress JSUnresolvedReference -->
<template>
  <!-- ResetPasswordPage Page -->
  <q-page class="flex flex-center">
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"
                    @dialog-closed="onMessageDialogClosed"/>

    <!-- Authentication Frame -->
    <c-authentication-frame :message="$t('authentication.reset.message')">
      <!-- Login Form -->
      <q-form @submit="onSubmit" greedy>
        <div class="q-col-gutter-y-sm">
          <!-- Email Row -->
          <div class="row q-col-gutter-x-sm">
            <!-- Email Column -->
            <div class="col">
              <!-- Email Input Field -->
              <c-input ref="inputEmail"
                       v-model="email"
                       :label="$t('common.emailAddress')"
                       :error-message="emailError"
                       :auto-focus="!email || email.length === 0"
                       mandatory
                       auto-complete="username"/>
            </div>
          </div>
          <!-- Button Row -->
          <div class="row">
            <!-- Button Column -->
            <div class="col text-center">
              <!-- Register Account Button -->
              <c-button :label="$t('button.resetPassword')" type="submit"/>
            </div>
          </div>
          <!-- Link Row -->
          <div class="row">
            <!-- Back Column -->
            <div class="col text-center">
              <!-- Back Link -->
              <c-button :label="$t('button.back')" look="link" to="login"/>
            </div>
          </div>
        </div>
      </q-form>
    </c-authentication-frame>
  </q-page>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CAuthenticationFrame from "components/auth/CAuthenticationFrame.vue";
import CInput from "components/common/CInput.vue";
import CButton from "components/common/CButton.vue";
import {Account} from "src/scripts/objects/Account";
import MessageDialog from "components/dialog/MessageDialog.vue";

export default {
  // This is the name of this page.
  name: "ResetPasswordPage",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {
    MessageDialog,
    CButton,
    CInput,
    CAuthenticationFrame
  },

  // The public attributes of this page.
  props: {},

  // The variables of this page.
  data() {
    return {
      // Email Address
      email: "",
      emailError: null
    }
  },

  // Called before this page is mounted.
  beforeMount() {
    // Register "language-changed" event.
    this.$bus.on("language-changed", () => {
      // Reset error states
      this.resetErrorMessages();
    });
    // Get email from cookie
    this.email = this.q.cookies.get("email");
  },

  // The methods of this page.
  methods: {
    /**
     * Handles the form submission process for resetting the password.
     */
    async onSubmit() {
      // Reset error messages
      this.resetErrorMessages();

      // Start the process
      await this.run(
        this.$t,
        async (t) => {
          // Request password reset mail
          await Account.resetPassword(this.email);
          // Show success dialog
          this.showSuccessDialog(
            "success",
            t("authentication.reset.success.title"),
            t("authentication.reset.success.message")
          );
        },
        (t, error) => {
          // Get error code.
          const code = error.code;
          // Invalid email address.
          if (code === "auth/invalid-email") {
            this.emailError = t("authentication.register.error.invalidEmail");
            return false;
          }
          return true;
        }
      );
    },

    /**
     * This method is called when the message dialog of this page was closed.
     * @param {{value:string, action:string, data:*}} event The event data.
     */
    onMessageDialogClosed(event) {
      // When success then redirect to login page.
      if (event.action === "success") {
        this.$router.push({path: "login"});
      }
    },

    /**
     * Resets all error messages.
     */
    resetErrorMessages() {
      this.emailError = null;
      this.$refs.inputEmail?.resetError();
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
