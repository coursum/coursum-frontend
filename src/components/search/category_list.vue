<template>
  <v-list dense>
    <v-subheader>科目から探す</v-subheader>

    <template v-for="(key, index) in Object.keys($t('categories'))">
      <v-list-group
        v-if="Object.keys($t('categories')[key]).length > 0"
        :key="`first-${index}`"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ key }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, idx) in $t('categories')[key]"
          :key="idx"
          links
          :to="
            '/category' +
              '/' +
              Object.keys(categoryLists[index])[0] +
              '/' +
              categoryLists[index][
                Object.keys(categoryLists[index])[0]
              ][idx]
          "
        >
          <v-list-item-title>
            {{ item }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-else
        :key="`second-${index}`"
        link
        :to="'/category' + '/' + Object.keys(categoryLists[index])[0]"
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

  data() {
    return {
      categoryLists: [
        { research: [] },
        {
          fundamental: ['introductory', 'language-communication', 'data-science',
            'information-technology', 'wellness', 'interdisciplinary'],
        },
        { advanced: ['series-of-policy-management', 'series-of-environment-and-information-studies'] },
        {
          others: ['special-subjects', 'specialized-subjects-in-teacher-training',
            'courses-offered-at-research-institutes-on-sfc',
            'courses-offered-at-other-faculties', 'optional-subjects'],
        },
      ],
    };
  },
});
</script>
