<!-- Choose Account Dialog -->
<template>
  <!-- Dialog -->
  <c-dialog ref="dialog"
            v-model="visible"
            :width="400"
            :title="$t('dialog.chooseAccount.title')"
            :buttons="[{value:'ok', label:'button.okay'},{value:'cancel', label:'button.cancel'}]"
            @dialog-closed="onDialogClosed">

  </c-dialog>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CDialog from "components/common/CDialog.vue";

export default {
  // The name of this dialog
  name: "ChooseAccountDialog",

  // The used mixins of this dialog
  mixins: [
    BasicMixin
  ],

  // The used components of this dialog
  components: {
    CDialog
  },

  // The variables of this dialog
  data() {
    return {
      // Visibility of the dialog
      visible: false
    }
  },

  // The methods of this dialog
  methods: {
    /**
     * Callback function triggered when the dialog is closed.
     *
     * @param {CDialog} dialog - The dialog object.
     * @param {string} value - The value returned from the dialog.
     */
    onDialogClosed(dialog, value) {
      if (value === "cancel") {
        this.$refs.dialog.close();
      }
    }
  }
}
</script>
