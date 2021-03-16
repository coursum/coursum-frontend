<template>
  <div
    v-if="titleData"
    class="text-truncate font-weight-bold"
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

<style scoped>
div{
  font-size: 0.9rem;
  color: #37474F;
}
</style>
