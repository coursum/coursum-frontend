<template>
  <v-chip v-if="semesterData"
          color="caption"
          outlined
          x-small
  >
    {{ semesterData }}
  </v-chip>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { CourseInfo } from '@/types/CourseInfo';
import { i18nDataTemplate } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DScheduleSemester',
  props: {
    semester: {
      type: Object as PropType<CourseInfo['schedule']['semester']>,
      default: i18nDataTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');
    const semesterData = computed(() => props.semester[curLang.value]);

    return {
      semesterData,
    };
  },
});
</script>
