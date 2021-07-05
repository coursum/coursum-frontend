<template>
  <span v-if="lecturers && 0 < lecturers.length"
        :class="{'text-truncate': textTruncate}"
  >
    <template v-for="(lecturer, i) in lecturers">
      <span v-if="lecturer.name[curLang]" :key="i"
            class="mr-2"
      >
        {{ lecturer.name[curLang] }}
      </span>
    </template>
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { Course } from 'coursum-types';

export default defineComponent({
  name: 'DLectures',
  props: {
    lecturers: {
      type: Array as PropType<Course['lecturers']>,
      default: undefined,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
  },
  setup: (_, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

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
