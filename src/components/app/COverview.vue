<template>
  <!-- Overview Page (empty) -->
  <q-page class="flex flex-center">
    <div class="q-col-gutter-y-md">
      <!-- Title Row -->
      <div class="row">
        <!-- Title Column -->
        <div class="col overview-title text-center">{{ $t(scope + ".title") }}</div>
      </div>
      <!-- Upper Separator -->
      <div class="row">
        <div class="col-4"/>
        <div class="col-4 overview-title-separator" style="height: 1px"/>
        <div class="col-4"/>
      </div>
      <!-- Empty Message Row -->
      <div class="row">
        <div class="col-4"/>
        <!-- Empty Message Column -->
        <div class="col-4">{{ $t(scope + ".emptyMessage") }}</div>
        <div class="col-4"/>
      </div>
      <!-- Lower Separator -->
      <div class="row">
        <div class="col-4"/>
        <div class="col-4 overview-title-separator" style="height: 1px"/>
        <div class="col-4"/>
      </div>
      <!-- Create Button Row -->
      <div class="row">
        <!-- Create Button Column -->
        <div class="col text-center">
          <!-- Create Button -->
          <c-button :label="$t(scope + '.createButton')"/>
        </div>
      </div>
    </div>
  </q-page>

  <!-- Overview Page (not empty) -->
  <q-page>

  </q-page>
</template>

<style lang="scss">
.overview-title-separator {
  background: linear-gradient(90deg, transparent 0%, $primary 50%, transparent 100%);
}

.overview-title {
  color: $primary;
  font-size: 14pt;
  font-weight: bold;
}
</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CButton from "components/common/CButton.vue";

export default {
  // This is the name of this component.
  name: "COverview",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {CButton},

  // The public attributes of this component.
  props: {
    // Title
    scope: {
      type: String,
      required: true
    },
    // Array of items to be shown in the overview.
    items: {
      type: Array,
      required: true
    }
  },

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
