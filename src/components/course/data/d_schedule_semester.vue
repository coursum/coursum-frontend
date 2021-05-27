<template>
  <v-chip
    v-if="semesterData"
    style="color: #929292"
    outlined
    x-small
  >
    {{ semesterData }}
  </v-chip>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DScheduleSemester',
  props: {
    semester: {
      type: Object,
      default: basicTemplate,
    },
  },
  setup: (props, context) => {
    const curLang = computed((): string => context.root.$i18n.locale);

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
