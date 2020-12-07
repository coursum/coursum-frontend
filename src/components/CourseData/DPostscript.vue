<template>
  <span
    v-if="
      courseDatas[idx].title &&
        courseDatas[idx].title.postscript &&
        courseDatas[idx].title.postscript[`${curLang}`]
    "
    style="color: #929292"
    class="text-caption text-truncate"
  >
    {{ courseDatas[idx].title.postscript[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { CourseInfo } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DPostsctipt',
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
