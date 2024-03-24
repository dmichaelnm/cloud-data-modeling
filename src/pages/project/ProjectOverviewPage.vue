<!--suppress JSUnresolvedReference -->
<template>
  <!-- Dashboard Overview -->
  <c-overview scope="project"
              :items="this.session.projectList"
              :columns="[{name: 'actions', align: 'left', headerStyle: 'width: 75px'},
                         {name: 'name', label: $t('common.projectName'), align: 'left', headerStyle: 'width: 500px',
                          sortable: true, field: row => row.data.name},
                         {name: 'owner', label: $t('common.owner'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => row.ownerName},
                         {name: 'manager', label: $t('common.projectManager'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => row.managerName},
                         {name: 'role', label: $t('common.yourRole'), align: 'left', headerStyle: 'width: 150px',
                          sortable: true, field: row => $t('role.' + row.role)},
                         {name: 'created', label: $t('common.created'), align: 'left', headerStyle: 'width: 150px'},
                         {name: 'altered', label: $t('common.altered'), align: 'left'}]">
    <!-- Project Name Template -->
    <template v-slot:body-cell-name="{props}">
      <q-td :props="props">
        <div>{{ props.row.data.name }}</div>
        <div class="text-small">{{ props.row.data.description }}</div>
      </q-td>
    </template>
    <!-- Project Actions -->
    <template v-slot:body-cell-actions="{props}">
      <q-td :props="props">
        <!-- Edit Button -->
        <q-btn round flat size="xs" icon="edit" color="primary"/>
        <!-- Delete Button -->
        <q-btn round flat size="xs" icon="delete" color="primary"/>
      </q-td>
    </template>
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
