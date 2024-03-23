<!--suppress JSUnresolvedReference -->
<template>
  <!-- CCustomAttributes Component -->
  <c-table ref="table"
           :columns="[{name: 'name', label: $t('common.customAttributes.name'), align: 'left',
                       headerStyle: 'width: 250px', field: row => row.name, inputType: 'string' },
                      {name: 'type', label: $t('common.customAttributes.type'), align: 'left',
                       headerStyle: 'width: 150px', field: row => $t('common.customAttributes.types.' + row.type),
                       inputType: 'selection', options: getAttributeTypes($t)},
                      {name: 'value', label: $t('common.customAttributes.value'), align: 'left',
                       field: row => row.value, inputType: 'string'}]"
           :rows="attributes"
           selectable
           :no-data-label="$t('common.customAttributes.noData')"
           :handler-add="onAttributeAdd"
           :handler-delete="onAttributeDelete"
           @cell-value-changed="onCellValueChanged">
    <template v-slot:body-cell-value="{props}">
      <q-td :props="props">
        <div v-if="props.row.type === 'boolean'">{{ $t("common." + props.row.value) }}</div>
        <div v-if="props.row.type !== 'boolean'">{{ props.row.value }}</div>
        <!-- Input -->
        <q-popup-edit :ref="'popupEditValue' + props.rowIndex"
                      v-if="props.row.type !== 'boolean'"
                      v-model="props.row.value"
                      v-slot="scope"
                      class="popup-edit">
          <!-- Input Component -->
          <c-input ref="input"
                   borderless
                   v-model="scope.value"
                   hide-bottom
                   auto-focus
                   @focus="$refs.input.select()"
                   @blur="$refs.table.updatePopupEdit($refs['popupEditValue' + props.rowIndex], props.rowIndex, 'value', scope.value)"
                   @key-enter="$refs.table.updatePopupEdit($refs['popupEditValue' + props.rowIndex], props.rowIndex, 'value', scope.value)"/>
        </q-popup-edit>
        <!-- Selection -->
        <q-popup-edit :ref="'popupEditValue' + props.rowIndex"
                      v-if="props.row.type === 'boolean'"
                      v-model="props.row.value"
                      v-slot="scope"
                      class="popup-edit"
                      @show="$refs.select.showPopup()">
          <!-- Select Component -->
          <c-select ref="select"
                    v-model="scope.value"
                    :options="getBooleanValues($t)"
                    @update:model-value="$refs.table.updatePopupEdit($refs['popupEditValue' + props.rowIndex], props.rowIndex, 'value', scope.value)"/>
        </q-popup-edit>
      </q-td>
    </template>
  </c-table>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import BasicMixin from "src/mixins/BasicMixin";
import CTable from "components/common/CTable.vue";
import {getAttributeTypes, getBooleanValues} from "src/scripts/options";
import CInput from "components/common/CInput.vue";
import CSelect from "components/common/CSelect.vue";

export default {
  // This is the name of this component.
  name: "CCustomAttributes",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {CSelect, CInput, CTable},

  // The public attributes of this component.
  props: {
    // Array of custom attributes
    attributes: {
      type: Array,
      required: true
    }
  },

  // The variables of this component.
  data() {
    return {
      // Function to get options for attribute types
      getAttributeTypes: getAttributeTypes,
      // Function to get options for boolean values
      getBooleanValues: getBooleanValues
    }
  },

  // Called before this component is mounted.
  beforeMount() {
  },

  // The methods of this component.
  methods: {
    /**
     * Looks for the next free default name, creates and adds a new attribute with the default name to the attributes
     * array.
     */
    onAttributeAdd() {
      // Look for the next free default name
      let index = 0;
      while (this.attributes.find(att => att.name === ("attribute" + index))) {
        index++;
      }
      // Create the new attribute
      this.attributes.push({
        name: "attribute" + index,
        type: "string",
        value: "?"
      })
    },

    /**
     * Deletes the attribute at the specified rowIndex.
     *
     * @param {number} rowIndex - The index of the attribute to delete.
     */
    onAttributeDelete(rowIndex) {
      this.attributes.splice(rowIndex, 1);
    },

    /**
     * This method is called when the value of a cell has been changed.
     *
     * @param {{index:number, name:string, new:string, old:string}} event - The event object that triggered the cell value change.
     */
    onCellValueChanged(event) {
      if (event.name === "type") {
        // Check type changes
        if (event.new === "boolean") {
          // Type switched to boolean, check value
          if (this.attributes[event.index].value !== "true" && this.attributes[event.index].value !== "false") {
            this.attributes[event.index].value = "false";
          }
        } else if (event.new === "number") {
          // Type switched to number, check value
          if (isNaN(parseFloat(this.attributes[event.index].value))
            || !isFinite(parseFloat(this.attributes[event.index].value))) {
            this.attributes[event.index].value = "0";
          }
        }
      } else if (event.name === "value" && this.attributes[event.index].type === "number") {
        // Check if new value is a valid number
        if (isNaN(parseFloat(event.new)) || !isFinite(parseFloat(event.new))) {
          // Invalid number, set value to the old value
          this.attributes[event.index].value = event.old;
        } else {
          // Valid number, set to the new value
          this.attributes[event.index].value = event.new;
        }
      }
    }
  },

  // Computed values fot his component.
  computed: {}
}
</script>
