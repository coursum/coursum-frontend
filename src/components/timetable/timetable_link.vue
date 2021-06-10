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

export default defineComponent({
  name: 'TimetableLink',
  setup: (_, context) => {
    const { $store, $router } = context.root;

    const timetableLength = computed((): number => (
      $store.state.timetable.courses.length
    ));

    const goResult = async () => {
      $router.push('/timetable');
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
