<template>
  <!-- CSelect Component -->
  <q-select ref="select"
            v-model="modelValue"
            dense
            options-dense
            borderless
            stack-label
            map-options
            emit-value
            :options="options"
            :label="label">
    <!-- Icon of this component -->
    <template v-slot:before v-if="icon">
      <q-icon :name="icon" :size="iconSize"/>
    </template>
    <!-- Options entry -->
    <template v-slot:option="props">
      <slot name="option" v-bind="props">
        <q-item dense clickable v-close-popup @click="updateValue(props.opt.value)">
          <q-item-section>{{ props.opt.label }}</q-item-section>
        </q-item>
      </slot>
    </template>
  </q-select>
</template>

<style lang="scss">

</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // This is the name of this component.
  name: "CSelect",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // The options to be shown in the options list.
    options: {
      type: Array,
      required: true
    },
    // The label of this component.
    label: {
      type: String
    },
    // An optional icon for this component.
    icon: {
      type: String
    },
    // The size of the optional icon.
    iconSize: {
      type: String,
      default: "xs"
    }
  },

  // The variables of this component.
  data() {
    return {
      modelValue: null
    }
  },

  // The methods of this component.
  methods: {
    updateValue(val) {
      console.debug(val);
      this.modelValue = val;
      this.$emit("update:modelValue", val);
    },

    showPopup() {
      this.$refs.select.showPopup();
    }
  },

  // Computed values fot his component.
  computed: {}
}
</script>
