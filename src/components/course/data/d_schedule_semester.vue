<template>
  <v-chip
    v-if="semester"
    style="color: #929292"
    outlined
    x-small
  >
    {{ semester }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DScheduleSemester',
  props: {
    semester: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    isSpring() {
      if (this.semester === 'Spring' || this.semester.includes('春')) {
        return true;
      }
      return false;
    },
  },
});
</script>
