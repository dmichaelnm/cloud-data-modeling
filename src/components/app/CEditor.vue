<!-- CEditor Component -->
<!--suppress JSUnresolvedReference, SassScssResolvedByNameOnly -->
<template>
  <!-- Editor Page -->
  <q-page>
    <div class="editor-page">
      <div class="row">
        <div class="col-1"/>
        <div class="col-10 q-col-gutter-y-sm">
          <!-- Title Row -->
          <div class="row">
            <!-- Title Column -->
            <div class="col editor-title">{{ $t(scope + ".editor." + editMode + ".title") }}</div>
          </div>
          <!-- Separator Row -->
          <div class="row">
            <!-- Separator Column -->
            <div class="col editor-separator" style="height: 1px"/>
          </div>
          <!-- Message Row -->
          <div class="row">
            <!-- Message Column -->
            <div class="col">{{ $t(scope + ".editor." + editMode + ".message") }}</div>
          </div>
          <!-- Editor Content Row -->
          <div class="row">
            <!-- Editor Content Column -->
            <div class="col editor-content">
              <!-- Editor Content -->
              <slot/>
            </div>
          </div>
          <!-- Separator Row -->
          <div class="row">
            <!-- Separator Column -->
            <div class="col editor-separator" style="height: 1px"/>
          </div>
          <!-- Editor Buttons Row-->
          <div class="row">
            <!-- Editor Buttons Column -->
            <div class="col q-gutter-x-md">
              <!-- Apply Button -->
              <c-button :label="$t('button.apply')" @click="handlerApply"/>
              <!-- Cancel Button -->
              <c-button :label="$t('button.cancel')" color="secondary" @click="close"/>
            </div>
          </div>
          <div class="col-1"/>
        </div>
      </div>
    </div>

  </q-page>
</template>

<style lang="scss">
.editor-page {
  padding: 16px;
}

.editor-title {
  font-size: 14pt;
  font-weight: bold;
  color: $secondary;
}

.editor-separator {
  background: linear-gradient(to right, transparent 0%, $light-frame 2%, $light-frame 98%, transparent 100%);
}

.body--dark .editor-separator {
  background: linear-gradient(to right, transparent 0%, $dark-frame 2%, $dark-frame 98%, transparent 100%);
}

.editor-content {
  margin: 16px 0;
}

</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CButton from "components/common/CButton.vue";

export default {
  // The name of this component
  name: "CEditor",
  components: {CButton},

  // The used mixins by this component
  mixins: [
    BasicMixin
  ],

  // The public attributes of this component
  props: {
    // The scope of the editor
    scope: {
      type: String,
      required: true
    },
    // Handler function that is called when then "Apply" button was clicked
    handlerApply: {
      type: Function,
      required: true
    }
  },

  // The methods of this component
  methods: {
    /**
     * Closes the editor and returns to the overview page.
     */
    close() {
      this.session.setEditorLock(false);
      this.$router.push({path: "/" + this.scope});
    }
  },

  // Computed values of this component
  computed: {
    // Returns the edit mode ("create" or "edit")
    editMode() {
      return this.session.editorItemId ? "edit" : "create";
    }
  }
}
</script>
