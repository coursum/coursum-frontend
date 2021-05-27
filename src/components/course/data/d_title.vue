<template>
  <div
    v-if="titleData"
    class="text-truncate font-weight-bold"
  >
    {{ titleData }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DTitle',
  props: {
    title: { type: Object, default: basicTemplate },
  },
  setup: (props, context) => {
    const curLang = computed((): string => context.root.$i18n.locale);

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
