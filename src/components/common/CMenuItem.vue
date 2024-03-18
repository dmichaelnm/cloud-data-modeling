<template>
  <!-- CMenuItem Component -->
  <q-item dense
          :class="itemClass"
          :clickable="clickable"
          @click="$emit('click')">
    <!-- Menu Icon Section -->
    <q-item-section v-if="icon || emptyIcon" avatar>
      <!-- Menu Icon -->
      <q-icon v-if="icon" :name="icon" size="xs"/>
    </q-item-section>
    <!-- Menu Label Section -->
    <q-item-section>
      <!-- Menu Label -->
      <q-item-label :class="labelClass">{{ label }}</q-item-label>
    </q-item-section>
    <!-- Item Slot -->
    <slot/>
  </q-item>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // This is the name of this component.
  name: "CMenuItem",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // The item class Attribute
    itemClass: {
      type: String
    },
    // Flag controlling whether this item is clickable.
    clickable: {
      type: Boolean,
      default: false
    },
    // The icon of the menu item.
    icon: {
      type: String
    },
    // Flag controlling the space for the icon should be shown.
    emptyIcon: {
      type: Boolean,
      default: false
    },
    // The label of the menu icon.
    label: {
      type: String,
      required: true
    },
    // The class attribute for the label
    labelClass: {
      type: String
    }
  },

  // Emittable events
  emits: [
    "click"
  ],

  // The variables of this component.
  data() {
    return {}
  },

  // Called before this component is mounted.
  beforeMount() {
  },

  // The methods of this component.
  methods: {},

  // Computed values fot his component.
  computed: {}
}
</script>
