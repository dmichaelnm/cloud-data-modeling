<!--suppress JSValidateTypes -->
<template>
  <!-- CButton Component -->
  <q-btn ref="button"
         unelevated
         :flat="flatAttr"
         no-caps
         spellcheck="false"
         :disable="disabledState"
         :color="colorAttr"
         :label="label"
         :size="size"
         :to="to"
         :type="type">

  </q-btn>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // This is the name of this component.
  name: "CButton",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // The color of the button.
    color: {
      type: String
    },
    // The label of the button.
    label: {
      type: String
    },
    // The look of the button.
    look: {
      type: String,
      default: "button"
    },
    // The size of the button.
    size: {
      type: String,
      default: "sm"
    },
    // The target route of the page to redirect.
    to: {
      type: String
    },
    // The type of the button.
    type: {
      type: String,
      default: "button"
    },
    // Flag controlling whether the button is disabled
    disable: {
      type: Boolean,
      default: false
    },
    // An optional user defined name of the button
    name: {
      type: String
    }
  },

  // The variables of this component.
  data() {
    return {
      // The disable state of the button
      disabledState: this.disable
    }
  },

  // The methods of this component.
  methods: {
    setDisable(value) {
      this.disabledState = value;
    }
  },

  // Computed values fot his component.
  computed: {
    // The flat attribute of the button.
    flatAttr() {
      return this.look === "link";
    },
    // The color attribute of the button.
    colorAttr() {
      return this.color ? this.color : this.look === "link" ? "secondary" : "primary";
    }
  }
}
</script>
