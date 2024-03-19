<!--suppress JSUnresolvedReference -->
<template>
  <!-- CInput Component -->
  <!--suppress JSValidateTypes -->
  <q-input ref="inputField"
           v-model="modelValue"
           dense
           outlined
           stack-label
           lazy-rules="ondemand"
           spellcheck="false"
           :autocomplete="autoComplete"
           :autofocus="autoFocus"
           :label="label"
           :type="type"
           :rules="[value => value?.trim().length > 0 || !mandatory || $t('error.input.empty') ]"
           :error="errorMessage !== undefined && errorMessage !== null"
           :error-message="errorMessage"
           @update:modelValue="updateValue">

  </q-input>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // This is the name of this component.
  name: "CInput",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // The auto complete attribute.
    autoComplete: {
      type: String
    },
    // Flag controlling whether the input component has focus by default.
    autoFocus: {
      type: Boolean,
      default: false
    },
    // An optional error message
    errorMessage: {
      type: String
    },
    // The label of this component.
    label: {
      type: String
    },
    // Flag controlling whether this input field is mandatory.
    mandatory: {
      type: Boolean,
      default: false
    },
    // The type of the input.
    type: {
      type: String,
      default: "text"
    }
  },

  // The variables of this page.
  data() {
    return {
      // Model Value
      modelValue: null
    }
  },

  // The methods of this component.
  methods: {
    resetError() {
      this.$refs.inputField.resetValidation();
    },
    /**
     * Updates the value of the model and emits the "update:modelValue" event.
     *
     * @param {string} val - The new value to update the model with.
     */
    updateValue(val) {
      this.modelValue = val;
      this.$emit("update:modelValue", val);
    }
  },

  // Computed values fot his component.
  computed: {}
}
</script>
