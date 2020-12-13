<template>
  <span
    v-if="title && title.name && title.name[`${curLang}`]"
    class="font-weight-black text-subtitle-1 text-truncate"
  >
    {{ title.name[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Title } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DTitle',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    title(): Title {
      return this.$store.state.courseDatas[this.idx].title;
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
