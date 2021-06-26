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

import type { CourseInfo } from '@/types/CourseInfo';
import { i18nDataTemplate } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DPostsctipt',
  props: {
    postscript: {
      type: Object as PropType<CourseInfo['title']['postscript']>,
      default: i18nDataTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');
    const postscriptData = computed(() => props.postscript[curLang.value]);

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
