<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          style="color: #cacfd3"
          class="font-weight-black"
        >
          {{ $t("indexPage") }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <template v-for="(key, index) in Object.keys($t('categories'))">
      <v-list-group
        v-if="Object.keys($t('categories')[key]).length > 0"
        :key="`first-${index}`"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              style="color: #cacfd3"
              class="font-weight-black"
            >
              {{ key }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, idx) in $t('categories')[key]"
          :key="idx"
          links
        >
          <v-list-item-content class="pl-5">
            <router-link
              :to="
                '/category' +
                  '/' +
                  Object.keys(categoryLists[index])[0] +
                  '/' +
                  categoryLists[index][
                    Object.keys(categoryLists[index])[0]
                  ][idx]
              "
              class="text-decoration-none"
            >
              <v-list-item-title
                style="color: #cacfd3; width: 160px"
                class="font-weight-black text-truncate"
              >
                {{ item }}
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-else
        :key="`second-${index}`"
        link
      >
        <v-list-item-content>
          <router-link
            :to="'/category' + '/' + Object.keys(categoryLists[index])[0]"
            class="text-decoration-none"
          >
            <v-list-item-title
              style="color: #cacfd3; width: 160px"
              class="font-weight-black text-truncate"
            >
              {{ key }}
            </v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider />

    <v-list-item>
      <v-list-item-content>
        <router-link
          to="/"
          class="text-decoration-none"
        >
          <v-list-item-title
            style="color: #cacfd3"
            class="font-weight-black"
          >
            教員一覧
          </v-list-item-title>
        </router-link>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <router-link
          to="/"
          class="text-decoration-none"
        >
          <v-list-item-title
            style="color: #cacfd3"
            class="font-weight-black"
          >
            アスペクト
          </v-list-item-title>
        </router-link>
      </v-list-item-content>
    </v-list-item>
  </div>
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
