<!--suppress JSUnresolvedReference -->
<template>
  <!-- CDialog Dialog -->
  <q-dialog ref="dialog" :model-value="visible" persistent no-shake
            @before-show="$emit('before-show')"
            @show="$emit('show')">
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
            <c-button v-for="b in buttons" :key="b.value" :name="b.value" :label="$t(b.label)" look="link"
                      @click="$emit('dialog-closed', {action: action, value: b.value})" ref="buttons"/>
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
    // Action that causes this dialog to be shown
    action: {
      type: String,
      default: "default"
    },
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

  // Emittable Events
  emits: [
    "before-show",
    "dialog-closed",
    "show"
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
    /**
     * Closes the dialog.
     */
    close() {
      this.$refs.dialog.hide();
    },

    /**
     * Returns a dialog button element with the specified name.
     *
     * @param {string} name - The name of the button to find.
     * @return {CButton} - The button element found matching the specified value, or `undefined` if no match is found.
     */
    getButton(name) {
      return this.$refs.buttons.find(btn => btn.name === name);
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
