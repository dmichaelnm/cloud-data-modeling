<!-- Project Editor Page -->
<!--suppress JSUnresolvedReference, JSIncompatibleTypesComparison -->
<template>
  <!-- Editor Component -->
  <c-editor ref="editor" scope="project" :handler-apply="onApply">
    <!-- Choose Account Dialog -->
    <choose-account-dialog v-model="chooseAccountDialogVisible"
                           :action="chooseAccountDialogAction"
                           @account-selected="onAccountSelected"/>
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"/>

    <!-- Form -->
    <q-form ref="form" @submit="onApply">
      <div>
        <!-- Tab Definition -->
        <q-tabs v-model="currentTab" dense no-caps align="left">
          <!-- General Tab -->
          <q-tab name="general" :label="$t('common.general')"/>
          <!-- Project Team Tab -->
          <q-tab name="team" :label="$t('project.editor.tab.team.title')"/>
          <!-- Custom Properties -->
          <q-tab name="custom" :label="$t('common.customAttributes.title')"/>
        </q-tabs>
        <!-- Tab Panels -->
        <q-tab-panels v-model="currentTab" keep-alive>
          <!-- General Tab Panel -->
          <q-tab-panel name="general">
            <div class="q-col-gutter-y-md">
              <!-- Project Properties Row -->
              <div class="row q-col-gutter-x-md">
                <!-- Project Name Column -->
                <div class="col">
                  <!-- Project Name Input -->
                  <c-input v-model="projectName" :label="$t('common.projectName')" mandatory auto-focus/>
                </div>
                <!-- Project Manager Column -->
                <div class="col">
                  <!-- Project Manager Input -->
                  <c-account-field v-model="projectManager"
                                   :label="$t('common.projectManager')"
                                   :disable="projectManagerReadOnly"
                                   @click="onShowChooseProjectManagerDialog"/>
                </div>
              </div>
              <!-- Project Description Row -->
              <div class="row">
                <!-- Project Description Column -->
                <div class="col">
                  <!-- Project Description Input -->
                  <c-input v-model="projectDescription" :label="$t('common.description')" auto-grow type="textarea"/>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- Project Team Tab Panel -->
          <q-tab-panel name="team">
            <div class="q-col-gutter-y-md">
              <!-- Message Row -->
              <div class="row">
                <!-- Message Column -->
                <div class="col">{{ $t("project.editor.tab.team.message") }}</div>
              </div>
              <!-- Table Row -->
              <div class="row">
                <!-- Table Column -->
                <div class="col">
                  <!-- Team Table -->
                  <c-table :columns="[{name: 'name', label: $t('column.memberName'), align: 'left', headerStyle: 'width: 250px',
                                       field: row => row.account.data.profile.firstName + ' ' + row.account.data.profile.lastName},
                                      {name: 'role', label: $t('column.role'), align: 'left', headerStyle: 'width: 250px',
                                       field: row => $t('role.' + row.role), inputType: 'selection', options: getRoles($t)},
                                      {name: 'empty'}]"
                           :rows="teamMembers"
                           selectable
                           :no-data-label="$t('project.editor.tab.team.table.noData')"
                           :handler-add="onShowChooseTeamManagerDialog"
                           :handler-delete="onRemoveAccount">

                  </c-table>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- Custom Attributes Tab Panel -->
          <q-tab-panel name="custom">
            <div class="q-col-gutter-y-md">
              <!-- Message Row -->
              <div class="row">
                <!-- Message Column -->
                <div class="col">{{ $t("common.customAttributes.message") }}</div>
              </div>
              <!-- Table Row -->
              <div class="row">
                <!-- Table Column -->
                <div class="col">
                  <!-- Custom Attributes -->
                  <c-custom-attributes :attributes="customAttributes"/>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
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
import CTable from "components/common/CTable.vue";
import MessageDialog from "src/dialogs/MessageDialog.vue";
import CCustomAttributes from "components/app/CCustomAttributes.vue";
import {getRoles} from "src/scripts/options";
import {Project} from "src/scripts/objects/Project";
import {Account} from "src/scripts/objects/Account";

export default {
  // The name of this page
  name: "ProjectEditorPage",

  // The used mixins of this page
  mixins: [
    BasicMixin
  ],

  // The used components of this page
  components: {
    CCustomAttributes,
    MessageDialog,
    CTable,
    ChooseAccountDialog,
    CAccountField,
    CInput,
    CEditor
  },

  // Called before this page is mounted.
  async beforeMount() {
    if (!this.session.editorItemId) {
      // Create mode, set own account as project manager per default.
      this.projectManager = this.session.account;
    } else {
      // Edit mode, get the project
      this.currentProject = this.session.projectList.find(prj => prj.id === this.session.editorItemId);
      // Apply general values
      this.projectName = this.currentProject.data.name;
      this.projectDescription = this.currentProject.data.description;
      this.projectManager = await Account.getAccountById(this.currentProject.data.manager);
      this.projectManagerReadOnly = !this.currentProject.hasRole("owner");
      // Load team members
      this.teamMembers = [];
      for (let member of this.currentProject.data.members) {
        const account = await Account.getAccountById(member.accountId);
        this.teamMembers.push({account: account, role: member.role});
      }
      // Load custom attributes
      this.customAttributes = this.currentProject.data.attributes;
    }
  },

  // The variables of this page.
  data() {
    return {
      // Project Name
      projectName: "",
      // Project Description
      projectDescription: "",
      // Project Manager
      projectManager: undefined,
      // Choose account dialog visibility
      chooseAccountDialogVisible: false,
      // Choose account dialog action
      chooseAccountDialogAction: "",
      // Current tab name
      currentTab: "general",
      // Team member array
      teamMembers: [],
      // Function for getting the role options
      getRoles: getRoles,
      // Custom Attributes
      customAttributes: [],
      // Current project
      currentProject: undefined,
      // Flag controlling whether the project manager field is read only
      projectManagerReadOnly: false
    }
  },

  // The methods of this page.
  methods: {
    /**
     * Displays the project manager choose account dialog.
     */
    onShowChooseProjectManagerDialog() {
      this.chooseAccountDialogAction = "projectManager";
      this.chooseAccountDialogVisible = true;
    },

    /**
     * Displays the team manager choose account dialog.
     */
    onShowChooseTeamManagerDialog() {
      this.chooseAccountDialogAction = "teamMember";
      this.chooseAccountDialogVisible = true;
    },

    /**
     * Handles the event when a project manager is selected.
     *
     * @param {{action:string, account: Account}} event - The event returned by the dialog.
     */
    onAccountSelected(event) {
      if (event.action === "projectManager") {
        // Check, if the account is already part of the team
        if (!this.teamMembers.find(acc => acc.account.id === event.account.id)) {
          // Apply the project manager account
          this.projectManager = event.account;
        } else {
          // Account is already part of the team
          this.showWarningDialog(
            "warning",
            this.$t("project.editor.tab.team.addFailed"),
            this.$t("project.editor.tab.team.alreadyMember")
          );
        }
      } else if (event.action === "teamMember") {
        if (event.account.id !== this.projectManager.id) {
          if (!this.teamMembers.find(acc => acc.account.id === event.account.id)) {
            this.teamMembers.push({account: event.account, role: "developer"});
          } else {
            // Account is already part of the team
            this.showWarningDialog(
              "warning",
              this.$t("project.editor.tab.team.addFailed"),
              this.$t("project.editor.tab.team.alreadyMember")
            );
          }
        } else {
          // Account is already project manager
          this.showWarningDialog(
            "warning",
            this.$t("project.editor.tab.team.addFailed"),
            this.$t("project.editor.tab.team.alreadyProjectManager")
          );
        }
      }
    },

    /**
     * Remove the account at the specified row index from the teamMembers array
     *
     * @param {number} rowIndex - The index of the account to be removed
     */
    onRemoveAccount(rowIndex) {
      // Remove the selected team member
      this.teamMembers.splice(rowIndex, 1);
    },

    /**
     * This method is called when the 'Apply' button is clicked in the form.
     * It is responsible for validating the form data and persisting the project.
     * If the form validation is successful, it will either update the current project or create a new project.
     */
    async onApply() {
      if (await this.$refs.form.validate()) {
        // Form validation was successful, start persisting the project
        if (this.currentProject) {
          // Update current Project
          await this.run(
            this.$t,
            async () => {
              // Apply local values to the project
              this.currentProject.data.name = this.projectName;
              this.currentProject.data.description = this.projectDescription;
              this.currentProject.data.manager = this.projectManager.id;
              this.currentProject.data.members = this.teamMembers.map(mbr => {
                return {accountId: mbr.account.id, role: mbr.role}
              });
              this.currentProject.data.attributes = this.customAttributes.map(att => {
                return {name: att.name, type: att.type, value: att.value}
              });
              // Update the project in firestore
              await this.currentProject.update(true);
              // Close the editor
              this.$refs.editor.close();
            }
          );
        } else {
          // Create new project
          await this.run(
            this.$t,
            async () => {
              // Create data structure for the new project
              const data = {
                name: this.projectName,
                description: this.projectDescription,
                owner: this.session.account.id,
                manager: this.projectManager.id,
                members: this.teamMembers.map(mbr => {
                  return {accountId: mbr.account.id, role: mbr.role}
                }),
                attributes: this.customAttributes.map(att => {
                  return {name: att.name, type: att.type, value: att.value}
                })
              };
              // Add the project to firestore
              const project = await Project.create(data);
              await project.init();
              // Add project to project list
              this.session.projectList.push(project);
              // Close the editor
              this.$refs.editor.close();
            }
          )
        }
      } else {
        // Validation has failed, don't close the editor.
      }
    }
  }
}

</script>
