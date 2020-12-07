<template>
  <span
    v-if="
      courseDatas[idx].title &&
        courseDatas[idx].title.name &&
        courseDatas[idx].title.name[`${curLang}`]
    "
    class="font-weight-black text-subtitle-1 text-truncate"
  >
    {{ courseDatas[idx].title.name[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DTitle',
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
