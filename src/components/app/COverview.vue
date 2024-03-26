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
    <!-- Message Dialog -->
    <message-dialog v-model="messageDialog.visible"
                    :action="messageDialog.action"
                    :title="messageDialog.title"
                    :message="messageDialog.message"
                    :details="messageDialog.details"
                    :color="messageDialog.color"
                    :data="messageDialog.data"
                    :buttons="messageDialog.buttons"
                    @dialog-closed="onMessageDialogClosed"/>

    <div class="overview-page">
      <div class="row">
        <div class="col-1"/>
        <div class="col-10 q-col-gutter-y-sm ">
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
                <!-- Actions Template -->
                <template v-slot:body-cell-actions="{props}">
                  <slot name="body-cell-actions" :props="props">
                    <q-td :props="props">
                      <!-- Edit Item Button -->
                      <q-btn round flat size="sm" icon="o_edit" color="primary"
                             :class="permissions('edit', props.row) ? '' : 'invisible'"
                             @click="openEditor(props.row.id)"/>
                      <!-- Delete Item Button -->
                      <q-btn round flat size="sm" icon="o_delete" color="negative"
                             :class="permissions('delete', props.row) ? '' : 'invisible'"
                             @click="onConfirmDeleteItem(props.row)"/>
                    </q-td>
                  </slot>
                </template>
                <!-- Item Name Template -->
                <template v-slot:body-cell-name="{props}">
                  <slot name="body-cell-name" :props="props">
                    <q-td :props="props">
                      <div>{{ props.row.data.name }}</div>
                      <div class="text-small">{{ props.row.data.description }}</div>
                    </q-td>
                  </slot>
                </template>
                <!-- Created Column -->
                <template v-slot:body-cell-created="{props}">
                  <slot name="body-cell-created" :props="props">
                    <q-td :props="props">
                      <div>{{ props.row.data.meta.createdBy }}</div>
                      <div>
                        {{ formatTimestamp(props.row.data.meta.createdAt, session.account.data.preferences.language) }}
                      </div>
                    </q-td>
                  </slot>
                </template>
                <!-- Altered Column -->
                <template v-slot:body-cell-altered="{props}">
                  <slot name="body-cell-altered" :props="props">
                    <q-td :props="props">
                      <div>{{ props.row.data.meta.alteredBy }}</div>
                      <div>
                        {{ formatTimestamp(props.row.data.meta.alteredAt, session.account.data.preferences.language) }}
                      </div>
                    </q-td>
                  </slot>
                </template>
                <!-- Publish columns to the owner component -->
                <template
                  v-for="col in columns.filter(c => c.name !== 'created' &&
                                               c.name !== 'altered' &&
                                               c.name !== 'name' &&
                                               c.name !== 'actions')"
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
import MessageDialog from "src/dialogs/MessageDialog.vue";

export default {
  // This is the name of this component.
  name: "COverview",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {
    CTable,
    CButton,
    MessageDialog
  },

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
    },
    // A function that returns the permissions for this overview.
    permissions: {
      type: Function,
      required: true
    },
    // A function that handles the deletion of an item.
    handlerDelete: {
      type: Function
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
    },

    /**
     * Shows a confirmation dialog for deleting an item.
     *
     * @param {object} item - The item to be deleted.
     */
    onConfirmDeleteItem(item) {
      console.debug(item);
      // Show confirmation dialog
      this.showConfirmationDialog(
        "delete",
        this.$t(this.scope + ".delete.title"),
        this.$t(this.scope + ".delete.message", {name: item.data.name}),
        "primary",
        undefined,
        item
      );
    },

    /**
     * This method is called when the message dialog of this page was closed.
     * @param {{value:string, action:string, data:*}} event The event data.
     */
    onMessageDialogClosed(event) {
      if (event.action === "delete" && event.value === "yes") {
        // User confirmed the deletion
        this.handlerDelete(event.data);
      }
    }
  },

  // Computed values fot his component.
  computed: {}
}
</script>
