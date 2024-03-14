<template>
  <!-- LoginPage Page -->
  <q-page class="flex flex-center">
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
              <c-button :label="$t('button.resetPassword')" look="link"/>
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

export default {
  // This is the name of this page.
  name: "LoginPage",

  // The mixins used by this page.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {
    CAuthenticationFrame,
    CButton,
    CInput
  },

  // The variables of this page.
  data() {
    return {
      // Email Address
      email: "",
      // Password
      password: ""
    }
  },

  // Called before this component is mounted.
  beforeMount() {
    // Register "language-changed" event.
    this.$bus.on("language-changed", () => {
      // Reset error states
      this.$refs.inputEmail.resetError();
      this.$refs.inputPassword.resetError();
    });
    // Get email from cookie
    this.email = this.q.cookies.get("email");
  },

  // The methods of this component.
  methods: {
    onSubmit() {
      console.debug("Submit");
    }
  }
}
</script>
