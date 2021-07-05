<template>
  <div v-if="titleData"
       class="text-truncate font-weight-bold word--text"
  >
    {{ titleData }}
  </div>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { Course } from 'coursum-types';

export default defineComponent({
  name: 'DTitle',
  props: {
    title: {
      type: Object as PropType<Course['title']['name']>,
      required: true,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');
    const titleData = computed(() => props.title[curLang.value]);

    return {
      titleData,
    };
  },
});
</script>

<style scoped>
div {
  font-size: 0.9rem;
}
</style>
