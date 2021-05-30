<template>
  <div
    v-if="summaryData"
    :class="{summary: textTruncate}"
    class="caption--text"
    :style="summaryStyle"
  >
    <p
      class="my-0"
    >
      {{ summaryData }}
    </p>
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { Basic, Title } from '@/assets/CourseInfo';
import { basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DSummary',
  props: {
    summary: {
      type: Object as PropType<Basic>,
      default: basicTemplate,
    },
    title: {
      type: Object as PropType<Title>,
      required: true,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props, context) => {
    const summaryStyle = { 'font-size': '0.85rem' };

    const titleJp = computed((): string | null | undefined => props.title?.name?.jp);

    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'jp');

    const summaryData = computed((): string | null | undefined => {
      if (titleJp.value === '研究会Ａ' || titleJp.value === '研究会Ｂ') {
        return props.summary?.en;
      }

      return props.summary?.[curLang.value];
    });

    return {
      summaryStyle,
      summaryData,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
