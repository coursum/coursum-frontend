<template>
  <v-list
    nav
    dense
  >
    <v-list-item @click.prevent="goResult">
      <v-list-item-icon>
        <v-icon>mdi-folder</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ $t('my-table') }}
          <v-chip
            class="mx-2"
            label
            x-small
          >
            {{ timetableLength }}
          </v-chip>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import tool from '@/api/build_query';

export default defineComponent({
  name: 'TimetableLink',
  setup: (_, context) => {
    const timetableLength = computed((): number => context.root.$store
      .state.timetable.courses.length);

    const goResult = async () => {
      tool.goToResultPage('/timetable');
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
  "jp": {
    "my-table": "マイ時間割"
  }
}
</i18n>
