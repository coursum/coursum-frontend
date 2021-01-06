<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        class="text-decoration-none mx-1"
        v-on="on"
        @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
      >
        <v-icon
          color="blue"
        >
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group>
        <v-list-item
          to="/timetable"
          link
        >
          <v-list-item-title>
            {{ $t('my-table') }}
          </v-list-item-title>
          <v-icon>mdi-arrow-top-right</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AccountButton',
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
