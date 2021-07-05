<template>
  <v-list-item @click.prevent="goResult">
    <v-list-item-icon>
      <v-icon>mdi-folder</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
        {{ $t('my-table') }}
        <v-chip class="mx-2" label x-small>
          {{ timetableLength }}
        </v-chip>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import injectStrict from '@/util/inject-strict';
import { timetableCoursesKey } from '@/util/injection-keys';

export default defineComponent({
  name: 'TimetableLink',
  setup: (_, context) => {
    const { $router } = context.root;

    const timetableCourses = injectStrict(timetableCoursesKey);
    const timetableLength = computed(() => timetableCourses.value.length);

    const goResult = async () => {
      await $router.push('/timetable');
    };

    return {
      timetableLength,
      goResult,
    };
  },
});
</script>

<i18n>
{
  "en": {
    "my-table": "My Time Table"
  },
  "ja": {
    "my-table": "マイ時間割"
  }
}
</i18n>
