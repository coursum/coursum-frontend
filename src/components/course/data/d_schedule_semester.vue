<template>
  <v-chip
    v-if="semesterData"
    color="caption"
    outlined
    x-small
  >
    {{ semesterData }}
  </v-chip>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import { Basic, basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DScheduleSemester',
  props: {
    semester: {
      type: Object as PropType<Basic>,
      default: basicTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'jp' | 'en');

    const semesterData = computed((): string | null | undefined => props.semester?.[curLang.value]);

    const isSpring = computed(() => {
      if (semesterData.value === 'Spring' || semesterData.value?.includes('春')) {
        return true;
      }
      return false;
    });

    return {
      semesterData,
      isSpring,
    };
  },
});
</script>
