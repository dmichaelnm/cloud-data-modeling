<!--suppress JSUnresolvedReference -->
<template>
  <!-- RegisterAccountPage Page -->
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
    <c-authentication-frame :message="$t('authentication.register.message')">
      <!-- Login Form -->
      <q-form @submit="onSubmit" greedy>
        <div class="q-col-gutter-y-sm">
          <!-- Name Row -->
          <div class="row q-col-gutter-x-sm">
            <!-- First Name Column -->
            <div class="col">
              <!-- First Name Input -->
              <c-input ref="inputFistName"
                       v-model="firstName"
                       :label="$t('common.firstName')"
                       auto-focus
                       mandatory/>
            </div>
            <!-- Last Name Column -->
            <div class="col">
              <!-- Last Name Input -->
              <c-input ref="inputLastName"
                       v-model="lastName"
                       :label="$t('common.lastName')"
                       mandatory/>
            </div>
          </div>
          <!-- Email Row -->
          <div class="row q-col-gutter-x-sm">
            <!-- Email Column -->
            <div class="col">
              <!-- Email Input -->
              <c-input ref="inputEmail"
                       v-model="email"
                       :label="$t('common.emailAddress')"
                       :error-message="emailError"
                       auto-complete="username"
                       mandatory/>
            </div>
          </div>
          <!-- Password Row -->
          <div class="row q-col-gutter-x-sm">
            <!-- Password Column -->
            <div class="col">
              <!-- Password Input -->
              <c-input ref="inputPassword"
                       v-model="password"
                       :label="$t('common.password')"
                       :error-message="passwordError"
                       mandatory
                       auto-complete="new-password"
                       type="password"/>
            </div>
            <!-- Password Repeat Column -->
            <div class="col">
              <!-- Password Repeat Input -->
              <c-input ref="inputPasswordRepeat"
                       v-model="passwordRepeat"
                       :label="$t('common.passwordRepeat')"
                       :error-message="passwordRepeatError"
                       mandatory
                       auto-complete="new-password"
                       type="password"/>
            </div>
          </div>
          <!-- Button Row -->
          <div class="row">
            <!-- Button Column -->
            <div class="col text-center">
              <!-- Register Account Button -->
              <c-button :label="$t('button.registerAccount')" type="submit"/>
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
import CButton from "components/common/CButton.vue";
import CInput from "components/common/CInput.vue";
import MessageDialog from "components/dialog/MessageDialog.vue";
import {Account} from "src/scripts/objects/Account";

export default {
  // This is the name of this page.
  name: "RegisterAccountPage",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {
    CInput,
    CButton,
    CAuthenticationFrame,
    MessageDialog
  },

  // The public attributes of this page.
  props: {},

  // The variables of this page.
  data() {
    return {
      // First Name
      firstName: "",
      // Last Name
      lastName: "",
      // Email Address
      email: "",
      emailError: null,
      // Password
      password: "",
      passwordError: null,
      // Repeat Password
      passwordRepeat: "",
      passwordRepeatError: null
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

  // The methods of this page.
  methods: {
    /**
     * Handles the form submission process for registering a new account.
     */
    async onSubmit() {
      // Reset error messages
      this.resetErrorMessages();

      // Check password and password repeat.
      if (this.password !== this.passwordRepeat) {
        console.debug("password check");
        this.passwordRepeatError = this.$t("authentication.register.error.passwordCheck");
        return;
      }

      // Start the registering process.
      await this.run(
        this.$t,
        async (t) => {
          // Create the account
          await Account.create(
            this.firstName,
            this.lastName,
            this.email,
            this.password,
            this.$i18n.locale,
            this.q.dark.isActive
          );
          // Set email as cookie
          this.q.cookies.set("email", this.email);
          // Show success dialog.
          this.showSuccessDialog(
            "success",
            t("authentication.register.success.title"),
            t("authentication.register.success.message")
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
          // Email already in use.
          if (code === "auth/email-already-in-use") {
            this.emailError = t("authentication.register.error.emailInUse");
            return false;
          }
          // Password too weak.
          if (code === "auth/weak-password") {
            this.passwordError = t("authentication.register.error.weakPassword");
            return false;
          }
          // Unknown error.
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
      this.passwordError = null;
      this.passwordRepeatError = null;
      this.$refs.inputFistName?.resetError();
      this.$refs.inputLastName?.resetError();
      this.$refs.inputEmail?.resetError();
      this.$refs.inputPassword?.resetError();
      this.$refs.inputPasswordRepeat?.resetError();
    }
  }
}
</script>
