<template>
  <div class="text-truncate caption--text">
    {{ categoryData ? categoryData : $t("others") }}
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { CourseInfo } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DCategory',
  props: {
    category: {
      type: Object as PropType<CourseInfo['tag']['category']>,
      required: true,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');
    const categoryData = computed(() => props.category[curLang.value]);

    return {
      categoryData,
    };
  },
});
</script>

<style scoped>
div {
  font-size: 0.7rem;
}
</style>

<i18n>
{
  "en": {
    "others": "others"
  },
  "ja": {
    "others": "その他"
  }
}
</i18n>
