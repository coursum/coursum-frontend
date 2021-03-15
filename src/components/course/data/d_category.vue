<template>
  <div
    class="px-6 text-truncate"
  >
    {{ categoryData ? categoryData : $t("others") }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { basicTemplate } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DCategory',
  props: {
    category: { type: Object, default: basicTemplate },
  },
  computed: {
    categoryData(): string | null | undefined {
      return this.category?.[this.curLang];
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },
});
</script>

<style scoped>
div{
  font-size: 0.7rem;
  color: gray;
}
</style>

<i18n>
{
  "en": {
    "others": "others"
  },
  "jp": {
    "others": "その他"
  }
}
</i18n>
