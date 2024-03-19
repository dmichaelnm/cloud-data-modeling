<!-- Project Editor Page -->
<template>
  <!-- Editor Component -->
  <c-editor scope="project">

  </c-editor>
</template>

<script>
import CEditor from "components/app/CEditor.vue";
import BasicMixin from "src/mixins/BasicMixin";

export default {
  // The name of this page
  name: "ProjectEditorPage",

  // The used mixins of this page
  mixins: [
    BasicMixin
  ],

  // The used components of this page
  components: {
    CEditor
  }
}

</script>
