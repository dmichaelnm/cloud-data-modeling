<!--suppress JSUnresolvedReference -->
<template>
  <!-- Overview Page (empty) -->
  <q-page v-if="items.length === 0" class="flex flex-center">
    <div class="q-col-gutter-y-md">
      <!-- Title Row -->
      <div class="row">
        <!-- Title Column -->
        <div class="col overview-title text-center">{{ $t(scope + ".title") }}</div>
      </div>
      <!-- Upper Separator -->
      <div class="row">
        <div class="col-4"/>
        <div class="col-4 overview-empty-page-title-separator" style="height: 1px"/>
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
        <div class="col-4 overview-empty-page-title-separator" style="height: 1px"/>
        <div class="col-4"/>
      </div>
      <!-- Create Button Row -->
      <div class="row">
        <!-- Create Button Column -->
        <div class="col text-center">
          <!-- Create Button -->
          <c-button :label="$t(scope + '.createButton')" @click="openEditor()"/>
        </div>
      </div>
    </div>
  </q-page>

  <!-- Overview Page (not empty) -->
  <q-page v-if="items.length > 0">
    <div class="overview-page">
      <div class="row">
        <div class="col-1"/>
        <div class="col-10 q-col-gutter-y-xs ">
          <!-- Title Row -->
          <div class="row">
            <!-- Title Column -->
            <div class="col overview-title overview-inset">{{ $t(scope + ".title") }}</div>
          </div>
          <!-- Upper Separator -->
          <div class="row">
            <div class="col overview-page-title-separator" style="height: 1px"/>
          </div>
          <!-- Message Row -->
          <div class="row">
            <!-- Message Column -->
            <div class="col overview-inset">{{ $t(this.scope + ".overviewMessage") }}</div>
          </div>
          <!-- Create Button Row -->
          <div class="row" style="padding-top: 32px">
            <!-- Create Button Column -->
            <div class="col text-right">
              <!-- Create Button -->
              <c-button :label="$t(scope + '.createButton')" @click="openEditor()"/>
            </div>
          </div>
          <!-- Table Row -->
          <div class="row">
            <!-- Table Column -->
            <div class="col">
              <!-- Projects Table -->
              <c-table :columns="columns"
                       :rows="items">
                <!-- Created Column -->
                <template v-slot:body-cell-created="{props}">
                  <q-td :props="props">
                    <div>{{ props.row.data.meta.createdBy }}</div>
                    <div>
                      {{ formatTimestamp(props.row.data.meta.createdAt, session.account.data.preferences.language) }}
                    </div>
                  </q-td>
                </template>
                <!-- Publish columns to the owner component -->
                <template v-for="col in columns.filter(c => c.name !== 'created')"
                          v-slot:[`body-cell-${col.name}`]="{props}">
                  <slot :name="'body-cell-' + col.name" :props="props">
                    <q-td :props="props">
                      {{ props.value }}
                    </q-td>
                  </slot>
                </template>
              </c-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.overview-page {
  padding: 16px;
}

.overview-empty-page-title-separator {
  background: linear-gradient(90deg, transparent 0%, $primary 50%, transparent 100%);
}

.overview-page-title-separator {
  background: linear-gradient(90deg, transparent 0%, $primary 2%, $primary 98%, transparent 100%);
}

.overview-title {
  color: $primary;
  font-size: 14pt;
  font-weight: bold;
}

.overview-inset {
  padding-left: 32px;
}

</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CButton from "components/common/CButton.vue";
import CTable from "components/common/CTable.vue";

export default {
  // This is the name of this component.
  name: "COverview",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {CTable, CButton},

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
    },
    // Columns to be shown in the overview table
    columns: {
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
  methods: {
    /**
     * Opens the editor with the specified item ID.
     *
     * @param {string?} itemId - The ID of the item to open in the editor.
     */
    openEditor(itemId) {
      this.session.setEditorItemId(itemId);
      this.session.setEditorLock(true);
      this.$router.push({path: this.scope + "/editor"});
    }
  },

  // Computed values fot his component.
  computed: {}
}
</script>
