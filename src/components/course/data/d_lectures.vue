<template>
  <span
    v-if="lecturers && 0 < lecturers.length"
    :class="{'text-truncate': textTruncate}"
  >
    <template
      v-for="(lecturer, i) in lecturers"
    >
      <span
        v-if="lecturer.name && lecturer.name[`${curLang}`]"
        :key="i"
        class="mr-2"
      >
        {{ lecturer.name[`${curLang}`] }}
      </span>
    </template>
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { Lecturer } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DLectures',
  props: {
    lecturers: {
      type: Array as PropType<Lecturer[]>,
      default() {
        return undefined;
      },
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },
  setup: (_: any, context: any) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'jp');

    return {
      curLang,
    };
  },
});
</script>

<style scoped>
span {
  display: inline-block;
  font-size: 0.85rem;
}
</style>
