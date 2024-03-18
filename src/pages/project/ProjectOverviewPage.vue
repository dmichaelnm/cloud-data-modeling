<template>
  <!-- Dashboard Overview -->
  <c-overview scope="project" :items="[]">

  </c-overview>
</template>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import COverview from "components/app/COverview.vue";

export default {
  // This is the name of this page.
  name: "DashboardPage",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this page.
  components: {COverview},

  // The public attributes of this page.
  props: {},

  // The variables of this page.
  data() {
    return {}
  },

  // Called before this page is mounted.
  beforeMount() {
  },

  // The methods of this page.
  methods: {},

  // Computed values fot his page.
  computed: {}
}
</script>
