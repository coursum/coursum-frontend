<template>
  <span
    v-if="postscriptData"
    style="color: #929292"
    class="px-6 text-caption text-truncate"
  >
    {{ postscriptData }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DPostsctipt',
  props: {
    postscript: {
      type: Object,
      default: basicTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed((): string => context.root.$i18n.locale);

    const postscriptData = computed((): string | null | undefined => props
      .postscript?.[curLang.value]);

    return {
      postscriptData,
    };
  },
});
</script>
