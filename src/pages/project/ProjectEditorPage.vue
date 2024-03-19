<!-- Project Editor Page -->
<template>
  <!-- Editor Component -->
  <c-editor scope="project">
    <choose-account-dialog v-model="chooseAccountDialogVisible"/>

    <!-- Form -->
    <q-form>
      <div class="q-col-gutter-y-sm">
        <!-- Project Properties Row -->
        <div class="row q-col-gutter-x-md">
          <!-- Project Name Column -->
          <div class="col-3">
            <!-- Project Name Input -->
            <c-input v-model="projectName" :label="$t('common.projectName')" mandatory auto-focus/>
          </div>
          <!-- Project Manager Column -->
          <div class="col-3">
            <!-- Project Manager Input -->
            <c-account-field v-model="projectManager" :label="$t('common.projectManager')" @click="chooseAccountDialogVisible = true"/>
          </div>
        </div>
        <!-- Project Description Row -->
        <div class="row">
          <!-- Project Description Column -->
          <div class="col-6">
            <!-- Project Description Input -->
            <c-input v-model="projectDescription" :label="$t('common.description')"/>
          </div>
        </div>
      </div>
    </q-form>
  </c-editor>
</template>

<script>
import CEditor from "components/app/CEditor.vue";
import BasicMixin from "src/mixins/BasicMixin";
import CInput from "components/common/CInput.vue";
import CAccountField from "components/app/CAccountField.vue";
import ChooseAccountDialog from "src/dialogs/ChooseAccountDialog.vue";

export default {
  // The name of this page
  name: "ProjectEditorPage",

  // The used mixins of this page
  mixins: [
    BasicMixin
  ],

  // The used components of this page
  components: {
    ChooseAccountDialog,
    CAccountField,
    CInput,
    CEditor
  },

  beforeMount() {
    this.projectManager = this.session.account;
  },

  // The variables of this page
  data() {
    return {
      // Project Name
      projectName: "",
      // Project Description
      projectDescription: "",
      // Project Manager
      projectManager: undefined,
      // Choose account dialog visibility
      chooseAccountDialogVisible: false
    }
  }
}

</script>
