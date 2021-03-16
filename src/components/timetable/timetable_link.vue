<template>
  <v-list
    nav
    dense
  >
    <v-list-item @click.prevent="goResult">
      <v-list-item-icon>
        <v-icon>mdi-folder-heart</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ $t('my-table') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import tool from '@/api/build_query';

export default Vue.extend({
  name: 'TimetableLink',
  methods: {
    async goResult() {
      tool.goToResultPage('/timetable');
    },
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
