<template>
  <span v-if="postscriptData"
        class="px-6 text-caption text-truncate"
  >
    {{ postscriptData }}
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { Basic } from '@/types/CourseInfo';
import { basicTemplate } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DPostsctipt',
  props: {
    postscript: {
      type: Object as PropType<Basic>,
      default: basicTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'jp');

    const postscriptData = computed((): string | null | undefined => props
      .postscript?.[curLang.value]);

    return {
      postscriptData,
    };
  },
});
</script>

<style scoped>
span {
  color: #929292;
}
</style>
