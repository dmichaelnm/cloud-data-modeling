<template>
  <!-- CButton Component -->
  <q-btn unelevated
         no-caps
         spellcheck="false"
         color="primary"
         :label="label"
         :size="size"
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
    // The label of the button.
    label: {
      type: String
    },
    // The size of the button.
    size: {
      type: String,
      default: "sm"
    },
    // The type of the button.
    type: {
      type: String,
      default: "button"
    }
  },

  // The methods of this component.
  methods: {},

  // Computed values fot his component.
  computed: {}
}
</script>
