<!-- Account Field Component -->
<!--suppress JSUnresolvedReference, SassScssResolvedByNameOnly -->
<template>
  <q-field dense outlined stack-label :label="$t('common.projectManager')">
    <template v-slot:control>
      <div class="account-field">
        {{ modelValue ? modelValue.data.profile.firstName + " " + modelValue.data.profile.lastName : "" }}
      </div>
    </template>
    <template v-slot:append>
      <q-icon name="person_search" class="cursor-pointer" @click="$emit('click')"/>
    </template>
  </q-field>
</template>

<style lang="scss">
.account-field {
}
</style>

<script>
import {Account} from "src/scripts/objects/Account";

export default {
  // The name of this component.
  name: "CAccountField",

  // The public attributes of this component.
  props: {
    // The model value
    modelValue: {
      type: Account
    },
    // The label of this component
    label: {
      type: String
    }
  },

  // Emittable events
  emits: [
    "click"
  ],

  // The variables of this component
  data() {
    return {
      // Choose account dialog visibility
      dialogVisible: false
    }
  },

  // The methods of this component.
  methods: {}
}
</script>
