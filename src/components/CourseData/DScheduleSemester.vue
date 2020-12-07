<template>
  <div
    class="text-right text-truncate text-caption"
    style="color: #929292"
  >
    <span
      v-if="courseDatas[idx].schedule &&
        courseDatas[idx].schedule.semester &&
        courseDatas[idx].schedule.semester[`${curLang}`]"
    >
      {{ courseDatas[idx].schedule.semester[`${curLang}`] }}</span>・
    <span v-if="courseDatas[idx].credit">{{ courseDatas[idx].credit }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DScheduleSemester',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
