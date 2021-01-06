<template>
  <v-list dense>
    <template v-for="(key, i) in Object.keys($t('categories'))">
      <v-list-group
        v-if="Object.keys($t('categories')[key]).length > 0"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-title>
            {{ key }}
          </v-list-item-title>
        </template>

        <v-list-item
          v-for="(value, idx) in $t('categories')[key]"
          :key="idx"
          link
          :to="
            '/search/' + value
          "
        >
          <v-list-item-title class="pl-5">
            {{ value }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-else
        :key="i"
        link
        :to="'/search/' + key"
      >
        <v-list-item-title>
          {{ key }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoryList',
});
</script>
