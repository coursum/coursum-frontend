<template>
  <div
    v-if="schedule &&
      schedule.times &&
      schedule.times[`${curLang}`]
    "
    style="color: #929292"
    class="text-right text-truncate text-caption"
  >
    <span
      v-for="(time, i) in schedule.times[`${curLang}`]"
      :key="i"
    >
      {{ time[0] }}{{ time[3] }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Schedule } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DScheduleTimes',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    schedule(): Schedule {
      return this.$store.state.courseDatas[this.idx].shedule;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
