<!--suppress JSUnresolvedReference -->
<template>
  <!-- CInput Component -->
  <!--suppress JSValidateTypes -->
  <q-input ref="inputField"
           v-model="modelValue"
           dense
           :outlined="!borderless"
           :borderless="borderless"
           stack-label
           lazy-rules="ondemand"
           spellcheck="false"
           :autocomplete="autoComplete"
           :autofocus="autoFocus"
           :autogrow="autoGrow"
           :label="label"
           :type="type"
           :hide-bottom-space="hideBottom"
           :rules="[value => value?.trim().length > 0 || !mandatory || $t('error.input.empty') ]"
           :error="errorMessage !== undefined && errorMessage !== null"
           :error-message="errorMessage"
           :hint="hintMessage"
           @keyup.enter="$emit('keyEnter')"
           @update:modelValue="updateValue">
    <!-- Append Template -->
    <template v-if="appendIcon" v-slot:append>
      <!-- Append Icon -->
      <q-icon :name="appendIcon" class="cursor-pointer" @click="$emit('appendIconClick')"/>
    </template>
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
    // Flag controlling whether the input field grows with its content.
    autoGrow: {
      type: Boolean,
      default: false
    },
    // An optional error message
    errorMessage: {
      type: String
    },
    // An optional hint message
    hintMessage: {
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
    },
    // Append Icon
    appendIcon: {
      type: String
    },
    // Hides the bottom area
    hideBottom:{
      type: Boolean,
      default: false
    },
    // Flag controlling whether the input field has no border
    borderless: {
      type: Boolean,
      default: false
    }
  },

  // Emittable events
  emits: [
    "appendIconClick",
    "keyEnter",
    "update:modelValue"
  ],

  // The variables of this page.
  data() {
    return {
      // Model Value
      modelValue: null
    }
  },

  // The methods of this component.
  methods: {
    /**
     * Resets the error state of the input field.
     */
    resetError() {
      this.$refs.inputField.resetValidation();
    },

    /**
     * Selects the text in the input field.
     */
    select() {
      this.$refs.inputField.select();
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
