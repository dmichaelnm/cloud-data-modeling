<!--suppress VueUnrecognizedSlot -->
<template>
  <!-- CTable Component -->
  <div class="q-col-gutter-y-xs">
    <!-- Table Row -->
    <div class="row">
      <!-- Table Column -->
      <div class="col">
        <!-- Table -->
        <q-table dense flat
                 :columns="tableColumns"
                 :rows="rows"
                 :hide-no-data="!noDataLabel"
                 :rows-per-page-label="$t('common.recordsPerPage')"
                 :pagination="{rowsPerPage: 10}">
          <!-- Selection Column Template -->
          <template v-slot:body-cell-selection="props">
            <q-td :props="props">
              <q-radio v-model="selectedRowIndex" :val="props.rowIndex" size="xs"/>
            </q-td>
          </template>
          <!-- Custom Columns Template -->
          <template v-for="col in columns" v-slot:[`body-cell-${col.name}`]="props">
            <slot :name="'body-cell-' + col.name" :props="props">
              <q-td :props="props">
                <div :class="col.inputType ? 'text-editable-column' : ''">{{ props.value }}</div>
                <!-- Input -->
                <q-popup-edit :ref="'popupEdit' + col.name + props.rowIndex"
                              v-if="col.inputType === 'string'"
                              v-model="props.row[col.name]"
                              v-slot="scope"
                              class="popup-edit">
                  <!-- Input Component -->
                  <c-input ref="input"
                           borderless
                           v-model="scope.value"
                           hide-bottom
                           auto-focus
                           @focus="$refs.input.select()"
                           @blur="updatePopupEdit($refs['popupEdit' + col.name + props.rowIndex], props.rowIndex, col.name, scope.value)"
                           @key-enter="updatePopupEdit($refs['popupEdit' + col.name + props.rowIndex], props.rowIndex, col.name, scope.value)"/>
                </q-popup-edit>
                <!-- Selection -->
                <q-popup-edit :ref="'popupEdit' + col.name + props.rowIndex"
                              v-if="col.inputType === 'selection'"
                              v-model="props.row[col.name]"
                              v-slot="scope"
                              class="popup-edit"
                              @show="$refs.select.showPopup()">
                  <!-- Select Component -->
                  <c-select ref="select"
                            v-model="scope.value"
                            :options="col.options"
                            @update:model-value="updatePopupEdit($refs['popupEdit' + col.name + props.rowIndex], props.rowIndex, col.name, scope.value)"/>
                </q-popup-edit>
              </q-td>
            </slot>
          </template>
          <!-- No Data Template -->
          <template v-if="noDataLabel" v-slot:no-data>
            <div class="text-hint">{{ noDataLabel }}</div>
          </template>
        </q-table>
      </div>
    </div>
    <!-- Button Row -->
    <div class="row">
      <!-- Button Column -->
      <div class="col">
        <!-- Add button -->
        <q-btn v-if="handlerAdd" round flat size="xs" icon="add" color="primary" @click="handlerAdd"/>
        <!-- Delete button -->
        <q-btn v-if="handlerDelete" round flat size="xs" icon="remove" color="primary" @click="onDeleteRow"
               :class="rows.length === 0 ? 'invisible' : ''"/>
        <!-- Move to top button -->
        <q-btn v-if="movable" round flat size="xs" icon="mdi-arrow-collapse-up" color="primary" @click="onMoveToTop"
               :class="selectedRowIndex < 2 ? 'invisible' : ''"/>
        <!-- Move up button -->
        <q-btn v-if="movable" round flat size="xs" icon="mdi-arrow-up" color="primary" @click="onMoveUp"
               :class="rows.length < 2 || selectedRowIndex < 1 ? 'invisible' : ''"/>
        <!-- Move down button -->
        <q-btn v-if="movable" round flat size="xs" icon="mdi-arrow-down" color="primary" @click="onMoveDown"
               :class="rows.length < 2 || selectedRowIndex === rows.length - 1 ? 'invisible' : ''"/>
        <!-- Move to bottom button -->
        <q-btn v-if="movable" round flat size="xs" icon="mdi-arrow-collapse-down" color="primary"
               @click="onMoveToBottom"
               :class="rows.length < 3 || selectedRowIndex >= rows.length - 2 ? 'invisible' : ''"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.text-editable-column {
  cursor: pointer;
}

.popup-edit {
  border-width: 0;
  background-color: $light-background-input;
}

.body--dark .popup-edit {
  border-width: 0;
  background-color: $dark-background-input;
}
</style>

<script>
/* eslint-disable vue/no-mutating-props */
import BasicMixin from "src/mixins/BasicMixin";
import CSelect from "components/common/CSelect.vue";
import CInput from "components/common/CInput.vue";

export default {
  // This is the name of this component.
  name: "CTable",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {CInput, CSelect},

  // Emittable Events
  emits: [
    "sort-order-changed",
    "cell-value-changed"
  ],

  // The public attributes of this component.
  props: {
    // Array with column definitions.
    columns: {
      type: Array,
      required: true
    },
    // Array of rows to be shown in the tables
    rows: {
      type: Array
    },
    // Label when the table has no data
    noDataLabel: {
      type: String
    },
    // A function handling adding an item to the table
    handlerAdd: {
      type: Function
    },
    // A function handling deleting an item from the table
    handlerDelete: {
      type: Function
    },
    // A flag controlling whether the rows a selectable
    selectable: {
      type: Boolean,
      default: false
    },
    // A flag controlling whether the rows can be moved within the table
    movable: {
      type: Boolean,
      default: false
    }
  },

  // The variables of this component.
  data() {
    return {
      // Selected row index
      selectedRowIndex: 0
    }
  },

  // Called before this component is mounted.
  beforeMount() {
  },

  // The methods of this component.
  methods: {
    /**
     * Calls the delete handler function provided by the creator of this table.
     */
    onDeleteRow() {
      this.handlerDelete(this.selectedRowIndex);
      this.selectedRowIndex = Math.min(this.selectedRowIndex, this.rows.length - 1);
    },

    /**
     * Moves the selected row to the top of the rows list.
     */
    onMoveToTop() {
      const from = this.selectedRowIndex;
      const temp = this.rows[this.selectedRowIndex];
      this.rows.splice(this.selectedRowIndex, 1);
      this.rows.splice(0, 0, temp);
      this.selectedRowIndex = 0;
      this.$emit("sort-order-changed", from, this.selectedRowIndex);
    },

    /**
     * Moves the selected row up by one position in the array of rows.
     */
    onMoveUp() {
      const from = this.selectedRowIndex;
      const temp = this.rows[this.selectedRowIndex - 1];
      this.rows[this.selectedRowIndex - 1] = this.rows[this.selectedRowIndex];
      this.rows[this.selectedRowIndex] = temp;
      this.selectedRowIndex--;
      this.$emit("sort-order-changed", from, this.selectedRowIndex);
    },

    /**
     * Moves the selected row down by one position in the array of rows.
     */
    onMoveDown() {
      const from = this.selectedRowIndex;
      const temp = this.rows[this.selectedRowIndex + 1];
      this.rows[this.selectedRowIndex + 1] = this.rows[this.selectedRowIndex];
      this.rows[this.selectedRowIndex] = temp;
      this.selectedRowIndex++;
      this.$emit("sort-order-changed", from, this.selectedRowIndex);
    },

    /**
     * Moves the selected row to the bottom of the rows list.
     */
    onMoveToBottom() {
      const from = this.selectedRowIndex;
      const temp = this.rows[this.selectedRowIndex];
      this.rows.splice(this.selectedRowIndex, 1);
      this.rows.push(temp);
      this.selectedRowIndex = this.rows.length - 1;
      this.$emit("sort-order-changed", from, this.selectedRowIndex);
    },

    updatePopupEdit(popup, index, name, value) {
      const old = this.rows[index][name];
      this.rows[index][name] = value;
      popup.hide();
      this.$emit("cell-value-changed", {index: index, name: name, old: old, new: value});
    }
  },

  // Computed values fot his component.
  computed: {
    // Return the table column definitions
    tableColumns() {
      const columns = [];
      // Add first column for the selection, if necessary
      if (this.selectable) {
        columns.push({
          name: "selection",
          label: "",
          align: "center",
          headerStyle: "width: 75px"
        });
      }
      // Add custom columns
      columns.push(...this.columns);
      // Return the columns
      return columns;
    }
  }
}
</script>
