<template>
  <span
    v-if="
      courseDatas[idx].lecturers[0] &&
        courseDatas[idx].lecturers[0].name &&
        courseDatas[idx].lecturers[0].name[`${curLang}`]
    "
  >
    {{ courseDatas[idx].lecturers[0].name[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DLectures',
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
