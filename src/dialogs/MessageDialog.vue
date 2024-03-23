<!--suppress JSUnresolvedReference -->
<template>
  <!-- MessageDialog -->
  <c-dialog ref="dialog"
            v-model="visible"
            :width="600"
            @dialog-closed="onDialogClosed"
            :action="action"
            :color="color"
            :title="title"
            :buttons="buttons">
    <div class="q-col-gutter-y-md">
      <!-- Message Row -->
      <div class="row">
        <!-- Message Column -->
        <div class="col">{{ message }}</div>
      </div>
      <!-- Details Row -->
      <div v-if="details?.length > 0" class="row">
        <!-- Details Column -->
        <div class="col text-details">{{ details }}</div>
      </div>
    </div>
  </c-dialog>
</template>

<style lang="scss">
.text-details {
  font-size: 8pt;
  font-style: italic;
}
</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CDialog from "components/common/CDialog.vue";

export default {
  // This is the name of this page.
  name: "MessageDialog",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {
    CDialog
  },

  // The public attributes of this page.
  props: {
    // The action that causes this message dialog.
    action: {
      type: String,
      default: "default"
    },
    // The title of the dialog.
    title: {
      type: String
    },
    // The message of the dialog.
    message: {
      type: String,
      required: true
    },
    // Optional details to be shown.
    details: {
      type: String
    },
    // The color of the indicator.
    color: {
      type: String,
      default: "primary"
    },
    // Array of buttons
    buttons: {
      type: Array,
      default: () => [{value: "close", label: "button.close"}]
    },
    // Optional user data
    data: {}
  },

  emits: [
    "dialog-closed"
  ],

  // The variables of this page.
  data() {
    return {
      // The visibility of the dialog.
      visible: false
    }
  },

  // The methods of this page.
  methods: {
    /**
     * Executes when the dialog is closed.
     *
     * @param {{action:string, value:string}} event - The event passed when closing the dialog.
     */
    onDialogClosed(event) {
      // Emit event
      this.$emit("dialog-closed", {value: event.value, action: event.action, data: this.data});
      // Close dialog
      this.$refs.dialog.close();
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
