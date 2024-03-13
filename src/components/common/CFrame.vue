<template>
  <!-- CFrame Component -->
  <div :class="classAttr" :style="styleAttr">
    <div class="row">
      <div class="col">
        <!-- Content of the CFrame -->
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cframe {
  background-color: $light-background;
  border: 1px solid $light-frame;
  border-radius: 4px 4px;
}
.body--dark .cframe {
  background-color: $dark-background;
  border: 1px solid $dark-frame;
}

.cframe-shadow {
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.5);
}
</style>

<script>

export default {
  // This is the name of this component.
  name: "CFrame",

  // The used components of this component.
  components: {},

  // The public attributes of this component.
  props: {
    // Flag controlling whether the frame has a surrounding shadow.
    shadow: {
      type: Boolean,
      default: false
    },
    // The width of the frame.
    width: {
      type: Number
    }
  },

  // Computed values fot his component.
  computed: {
    // The computed class attribute
    classAttr() {
      return "cframe " + (this.shadow ? " cframe-shadow" : "");
    },
    // The computed style attribute value
    styleAttr() {
      return this.width ? "width: " + this.width + "px;" : "";
    }
  }
}
</script>
