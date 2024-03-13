<template>
  <!-- CFrameSection Component -->
  <div :class="classAttr" :style="styleAttr">
    <div class="col">
      <!-- Content of the frame section -->
      <slot/>
    </div>
  </div>
  <!-- Frame Separator -->
  <div v-if="separator" class="cframe-separator"/>
</template>

<style lang="scss">
.cframe-section {
  margin: 16px;
}

.cframe-section--dense {
  margin: 4px;
}

.cframe-separator {
  height: 1px;
  max-height: 1px;
  background-color: $light-frame;
}

.body--dark .cframe-separator {
  background-color: $dark-frame;
}
</style>

<script>
export default {
  // This is the name of this component.
  name: "CFrameSection",

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // Flag controlling whether the section has a smaller margin than normal.
    dense: {
      type: Boolean,
      default: false
    },
    // The height of the frame section.
    height: {
      type: Number
    },
    // Flag controlling whether a separator line is shown below the section.
    separator: {
      type: Boolean,
      default: false
    },
  },

  // Computed values fot his component.
  computed: {
    // The class attribute.
    classAttr() {
      return this.dense ? "cframe-section--dense" : "cframe-section";
    },
    // The style attribute.
    styleAttr() {
      return this.height ? "height: " + this.height + "px" : "";
    }
  }
}
</script>
