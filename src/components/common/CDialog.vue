<!--suppress JSUnresolvedReference -->
<template>
  <!-- CDialog Dialog -->
  <q-dialog ref="dialog" :model-value="visible" persistent no-shake>
    <c-frame shadow :width="width">
      <!-- Title Section -->
      <c-frame-section v-if="title" separator>
        <div class="dialog-title">{{ title }}</div>
      </c-frame-section>
      <!-- Content Section -->
      <c-frame-section separator :color="color">
        <!-- Content Slot -->
        <slot/>
      </c-frame-section>
      <!-- Button Section -->
      <c-frame-section dense>
        <div class="row">
          <div class="col text-right">
            <c-button v-for="b in buttons" :key="b.value" :label="$t(b.label)" look="link"
                      @click="onButtonClicked(b.value)"/>
          </div>
        </div>
      </c-frame-section>
    </c-frame>
  </q-dialog>
</template>

<style lang="scss">
.dialog-title {
  font-weight: bold;
  font-size: 10pt;
}
</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CFrame from "components/common/CFrame.vue";
import CFrameSection from "components/common/CFrameSection.vue";
import CButton from "components/common/CButton.vue";

export default {
  // This is the name of this page.
  name: "CDialog",

  // The used mixins of this component.
  mixins: [
    BasicMixin,
    CFrame,
    CFrameSection
  ],

  // The used components of this page.
  components: {CButton, CFrameSection, CFrame},

  // The public attributes of this page.
  props: {
    // Title of the dialog
    title: {
      type: String
    },
    // Buttons of the dialog
    buttons: {
      type: Array,
      default: () => {
        return [{value: "close", label: "button.close"}];
      }
    },
    // The width of the dialog
    width: {
      type: Number
    },
    // The color of the indicator for the content section.
    color: {
      type: String
    }
  },

  emits: [
    "dialog-closed"
  ],

  // The variables of this page.
  data() {
    return {
      // Visibility
      visible: false
    }
  },

  // The methods of this page.
  methods: {
    onButtonClicked(value) {
      // Close the dialog
      this.$refs.dialog.hide();
      // Emit the closing event
      this.$emit("dialog-closed", {value: value})
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
