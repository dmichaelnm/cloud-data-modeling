<template>
  <!-- CDrawerItem Component -->
  <q-item clickable v-ripple v-close-popup @click="$emit('click', scope)">
    <!-- Drawer Item Icon Section -->
    <q-item-section avatar>
      <!-- Drawer Item Icon -->
      <q-icon v-if="icon" :name="icon" color="secondary"/>
    </q-item-section>
    <!-- Drawer Item Label Section -->
    <q-item-section>
      <!-- Drawer Item Label -->
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // This is the name of this component.
  name: "CDrawerItem",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // The scope (page) this drawer item points to
    scope: {
      type: String,
      required: true
    },
    // The icon of the drawer item
    icon: {
      type: String
    },
    // The label of the drawer item
    label: {
      type: String,
      required: true
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
