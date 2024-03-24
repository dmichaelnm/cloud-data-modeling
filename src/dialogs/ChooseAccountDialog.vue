<!-- Choose Account Dialog -->
<!--suppress JSUnresolvedReference -->
<template>
  <!-- Dialog -->
  <c-dialog ref="dialog"
            v-model="visible"
            :action="action"
            :width="400"
            :title="$t('dialog.chooseAccount.title')"
            :buttons="[{value:'ok', label:'button.okay'},{value:'cancel', label:'button.cancel'}]"
            @dialog-closed="onDialogClosed" @before-show="onBeforeShow">
    <!-- Form -->
    <q-form @submit="onCheckEmail">
      <div class="q-col-gutter-y-sm">
        <!-- Message Row -->
        <div class="row">
          <!-- Message Column -->
          <div class="col">{{ $t("dialog.chooseAccount.message") }}</div>
        </div>
        <!-- Email Row -->
        <div class="row">
          <!-- Email Column -->
          <div class="col">
            <!-- Email Input -->
            <c-input ref="inputEmail"
                     v-model="email"
                     :label="$t('common.emailAddress')"
                     :error-message="emailError"
                     mandatory
                     auto-focus/>
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
import {Account} from "src/scripts/objects/Account";

export default {
  // The name of this dialog
  name: "ChooseAccountDialog",

  // The used mixins of this dialog
  mixins: [
    BasicMixin
  ],

  // The used components of this dialog
  components: {
    CInput,
    CDialog
  },

  // Emittable event
  emits: [
    "account-selected"
  ],

  // The public properties of this dialog
  props: {
    // Action
    action: {
      type: String,
      default: "default"
    }
  },

  // The variables of this dialog
  data() {
    return {
      // Visibility of the dialog
      visible: false,
      // Email Address
      email: "",
      emailError: null,
      // Account
      account: undefined
    }
  },

  // The methods of this dialog
  methods: {
    /**
     * This method is called before the dialog is shown.
     */
    onBeforeShow() {
      // Reset values
      this.email = "";
      this.emailError = undefined;
      this.account = undefined;
    },

    /**
     * Resets the error message, searches for the account associated with the entered email,
     * and enables/disables the OK button based on whether an account is found or not.
     */
    async onCheckEmail() {
      // Reset error message
      this.emailError = null;

      // Start the search process
      await this.run(
        this.$t,
        async () => {
          // Find the account for the entered email
          this.account = await Account.getAccountByEmail(this.email);
          if (this.account) {
            // Account found, close dialog and emit event
            this.$emit("account-selected", {action: this.action, account: this.account});
            this.$refs.dialog.close();
          } else {
            // Nothing found, disable OK button and set error message
            this.emailError = this.$t("dialog.chooseAccount.error.accountNotFound");
          }
        }
      )
    },

    /**
     * Callback function triggered when the dialog is closed.
     *
     * @param {{action:string, value:string}} event - The event returned from the dialog.
     */
    onDialogClosed(event) {
      if (event.value === "cancel") {
        this.$refs.dialog.close();
      } else if (event.value === "ok") {
        this.onCheckEmail();
      }
    }
  }
}
</script>
