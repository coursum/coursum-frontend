<template>
  <span
    v-if="schedule && schedule.semester && schedule.semester[`${curLang}`]"
    class="text-right text-truncate text-caption"
    style="color: #929292"
  >
    {{ schedule.semester[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Schedule } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DScheduleSemester',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    schedule(): Schedule {
      return this.$store.state.courseDatas[this.idx].schedule;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
