<template>
  <div v-if="summaryData"
       class="caption--text"
       :class="{summary: textTruncate}"
  >
    <p class="my-0">
      {{ summaryData }}
    </p>
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { CourseInfo } from '@/types/CourseInfo';
import { i18nDataTemplate } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DSummary',
  props: {
    summary: {
      type: Object as PropType<CourseInfo['summary']>,
      default: i18nDataTemplate,
    },
    title: {
      type: Object as PropType<CourseInfo['title']['name']>,
      required: true,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');
    const titleJp = props.title.ja || '';
    const summaryLang = ['研究会Ａ', '研究会Ｂ'].includes(titleJp) ? 'en' : curLang.value;
    const summaryData = props.summary[summaryLang];

    return {
      summaryData,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");

div {
  font-size: 0.85rem;
}

.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
