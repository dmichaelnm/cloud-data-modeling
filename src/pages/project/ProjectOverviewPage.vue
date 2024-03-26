<!--suppress JSUnresolvedReference, JSIncompatibleTypesComparison -->
<template>
  <!-- Dashboard Overview -->
  <c-overview scope="project"
              :items="this.session.projectList"
              :columns="[{name: 'actions', align: 'left', headerStyle: 'width:100px'},
                         {name: 'name', label: $t('common.projectName'), align: 'left', headerStyle: 'width: 500px',
                          sortable: true},
                         {name: 'owner', label: $t('common.owner'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => row.ownerName},
                         {name: 'manager', label: $t('common.projectManager'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => row.managerName},
                         {name: 'role', label: $t('common.yourRole'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => $t('role.' + row.role)},
                         {name: 'created', label: $t('common.created'), align: 'left', headerStyle: 'width: 150px'},
                         {name: 'altered', label: $t('common.altered'), align: 'left'}]"
              :permissions="getOverviewPermissions"
              :handler-delete="onDeleteProject"/>
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
  components: {
    COverview
  },

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
  methods: {
    /**
     * Retrieves the overview permissions for a given mode and project.
     *
     * @param {string} mode - The mode for which the permissions are retrieved.
     * @param {Project} project - The project for which the permissions are retrieved.
     * @returns {boolean} - Returns true if the user has overview permissions, and false otherwise.
     */
    getOverviewPermissions(mode, project) {
      // Check for edit permissions
      if (mode === "edit" && project.hasRole("owner", "manager")) {
        return true;
      }
      // Check for delete permissions
      return mode === "delete" && project.hasRole("owner");

    },

    /**
     * Deletes a project from Firestore and removes it from the project list.
     *
     * @param {Project} project - The project to be deleted.
     */
    async onDeleteProject(project) {
      // Run the deletion task
      await this.run(
        this.$t,
        async () => {
          // Delete the firestore document
          await project.delete();
          // Find project index
          const index = this.session.projectList.findIndex(prj => prj.id === project.id);
          // Remove the project from the list
          this.session.projectList.splice(index, 1);
        }
      )
    }
  },

  // Computed values fot his page.
  computed: {}
}
</script>
