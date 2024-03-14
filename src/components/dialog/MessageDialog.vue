<template>
  <!-- MessageDialog -->
  <c-dialog v-model="visible" :width="600" @dialog-closed="onDialogClosed" :color="color" :title="title">
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
    onDialogClosed(value) {
      this.$emit("dialog-closed", {value: value, action: this.action, data: this.data});
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
