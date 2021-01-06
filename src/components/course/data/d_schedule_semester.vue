<template v-if="semesterData">
  <v-chip
    style="color: #929292"
    outlined
    x-small
  >
    {{ semesterData }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue';
import { basicTemplate } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DScheduleSemester',
  props: {
    semester: {
      type: Object,
      default: basicTemplate,
    },
  },
  computed: {
    semesterData(): string | null | undefined {
      return this.semester?.[this.curLang];
    },
    isSpring() {
      if (this.semester === 'Spring' || this.semester.includes('春')) {
        return true;
      }
      return false;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
