<template>
  <span
    v-if="title && title.postscript && title.postscript[`${curLang}`]"
    style="color: #929292"
    class="text-caption text-truncate"
  >
    {{ title.postscript[`${curLang}`] }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Title } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DPostsctipt',
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
