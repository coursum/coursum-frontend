<template>
  <v-list
    nav
    dense
  >
    <v-list-item to="/timetable">
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

export default Vue.extend({
  name: 'TimetableLink',
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
