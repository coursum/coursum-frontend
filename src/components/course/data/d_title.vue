<template v-if="titleData">
  <div
    class="px-6 font-weight-black text-truncate"
    :style="styleObj"
  >
    {{ titleData }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { basicTemplate } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DTitle',
  props: {
    title: { type: Object, default: basicTemplate },
  },
  data() {
    return { styleObj: { 'font-size': '1.1rem', color: 'white' } };
  },
  computed: {
    titleData(): string | null | undefined {
      return this.title?.[this.curLang];
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>
