<template>
  <div
    v-if="
      courseDatas[idx].schedule &&
        courseDatas[idx].schedule.times &&
        courseDatas[idx].schedule.times[`${curLang}`]
    "
    style="color: #929292"
    class="text-right text-truncate text-caption"
  >
    <span
      v-for="(time, i) in courseDatas[idx].schedule.times[`${curLang}`]"
      :key="i"
    >
      {{ time[0] }}{{ time[3] }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DScheduleTimes',
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
