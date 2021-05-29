<template>
  <div
    class="text-truncate caption--text"
  >
    {{ categoryData ? categoryData : $t("others") }}
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import { Basic } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DCategory',
  props: {
    category: { type: Object as PropType<Basic>, required: true },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'jp' | 'en');

    const categoryData = computed((): string | null | undefined => props.category?.[curLang.value]);

    return {
      categoryData,
    };
  },
});
</script>

<style scoped>
div{
  font-size: 0.7rem;
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
