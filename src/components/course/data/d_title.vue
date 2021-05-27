<template>
  <div
    v-if="titleData"
    class="text-truncate font-weight-bold"
  >
    {{ titleData }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { Basic } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DTitle',
  props: {
    title: {
      type: Object as PropType<Basic>,
      required: true,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'jp' | 'en');

    const titleData = computed((): string | null | undefined => props.title?.[curLang.value]);

    return {
      titleData,
    };
  },
});
</script>

<style scoped>
div{
  font-size: 0.9rem;
  color: #37474F;
}
</style>
