<template>
  <div
    class="px-6 text-truncate"
    :style="categoryStyle"
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
  data() {
    return { categoryStyle: { 'font-size': '0.7rem', color: 'white' } };
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
