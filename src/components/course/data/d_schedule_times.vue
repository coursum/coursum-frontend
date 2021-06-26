<template>
  <span v-if="courseTimes">
    <v-chip v-for="(time, i) in courseTimes" :key="i"
            color="caption"
            outlined
            x-small
    >
      {{ time }}
    </v-chip>
  </span>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { CourseInfo } from '@/types/CourseInfo';
import { i18nDataTemplate } from '@/types/CourseInfo';

export default defineComponent({
  name: 'DScheduleTimes',
  props: {
    times: {
      type: Object as PropType<CourseInfo['schedule']['times']>,
      default: i18nDataTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

    const courseTimes = computed(() => {
      const times = props.times[curLang.value] || '';

      return times.split(',').map((time) => time.trim());
    });

    return {
      courseTimes,
    };
  },
});
</script>
