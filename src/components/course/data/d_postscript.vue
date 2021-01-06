<template v-if="postscriptData">
  <span
    style="color: #929292"
    class="px-6 text-caption text-truncate"
  >
    {{ postscriptData }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { basicTemplate } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DPostsctipt',
  props: {
    postscript: {
      type: Object,
      default: basicTemplate,
    },
  },
  computed: {
    postscriptData(): string | null | undefined {
      return this.postscript?.[this.curLang];
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
