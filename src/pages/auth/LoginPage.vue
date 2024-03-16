<!--suppress JSUnresolvedReference -->
<template>
  <!-- LoginPage Page -->
  <q-page class="flex flex-center">
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"/>

    <!-- Authentication Frame -->
    <c-authentication-frame :message="$t('authentication.login.message')">
      <!-- Login Form -->
      <q-form @submit="onSubmit" greedy>
        <div class="q-col-gutter-y-sm">
          <!-- Form Row -->
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
            <!-- Password Column -->
            <div class="col">
              <!-- Password Input Field -->
              <c-input ref="inputPassword"
                       v-model="password"
                       :label="$t('common.password')"
                       type="password"
                       :auto-focus="email?.length > 0"
                       mandatory
                       auto-complete="current-password"/>
            </div>
          </div>
          <!-- Button Row -->
          <div class="row">
            <!-- Button Column -->
            <div class="col text-center">
              <!-- Login Button -->
              <c-button :label="$t('button.login')" type="submit"/>
            </div>
          </div>
          <!-- Link Row -->
          <div class="row">
            <!-- Register Account Column -->
            <div class="col text-center">
              <!-- Register Account Button -->
              <c-button :label="$t('button.registerAccount')" look="link" to="register"/>
            </div>
            <!-- Reset Password Column -->
            <div class="col text-center">
              <!-- Reset Password Button -->
              <c-button :label="$t('button.resetPassword')" look="link" to="reset"/>
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
import CButton from "components/common/CButton.vue";
import CInput from "components/common/CInput.vue";
import {Account} from "src/scripts/objects/Account";
import MessageDialog from "components/dialog/MessageDialog.vue";

export default {
  // This is the name of this page.
  name: "LoginPage",

  // The mixins used by this page.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {
    MessageDialog,
    CAuthenticationFrame,
    CButton,
    CInput
  },

  // The variables of this page.
  data() {
    return {
      // Email Address
      email: "",
      emailError: null,
      // Password
      password: ""
    }
  },

  // Called before this component is mounted.
  beforeMount() {
    // Register "language-changed" event.
    this.$bus.on("language-changed", () => {
      // Reset error states
      this.resetErrorMessages();
    });
    // Get email from cookie
    this.email = this.q.cookies.get("email");
  },

  // The methods of this component.
  methods: {
    async onSubmit() {
      // Reset error messages
      this.resetErrorMessages();

      // Start login process
      await this.run(
        this.$t,
        async () => {
          // Try to log in
          await Account.login(this.email, this.password);
          // Set email as cookie
          this.q.cookies.set("email", this.email, {expires: 365});
          // Redirect to the main layout
          this.$router.push({path: "/"});
        },
        (t, error) => {
          // Get the error code
          const code = error.code;
          // Invalid email address
          if (code === "auth/invalid-email") {
            this.emailError = t("authentication.register.error.invalidEmail");
            return false;
          }
          // Invalid credentials
          if (code === "auth/invalid-credential") {
            this.emailError = t("authentication.login.error.invalidCredentials");
            return false;
          }
          // Too many failed attempts
          if (code === "auth/too-many-requests") {
            this.emailError = t("authentication.login.error.tooManyFailedAttempts");
            return false;
          }
          // Account is locked
          if (code === "auth/account-is-locked") {
            this.emailError = t("authentication.login.error.accountLocked");
            return false;
          }
          return true;
        }
      );
    },

    /**
     * Resets all error messages.
     */
    resetErrorMessages() {
      this.emailError = null;
      this.$refs.inputEmail?.resetError();
      this.$refs.inputPassword?.resetError();
    }
  }
}
</script>
