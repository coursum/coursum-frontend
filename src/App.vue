<template>
  <v-app>
    <top-bar />
    <side-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';

import request from '@/api/request';
import type { ValidIdParams } from '@/assets/CourseInfo';
import SideBar from '@/components/bar/side_bar.vue';
import TopBar from '@/components/bar/top_bar.vue';
import useStorage from '@/composables/useStorage';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    TopBar,
  },
  setup: (_, { root: { $vuetify, $i18n } }) => {
    const { getItem } = useStorage(localStorage);

    const applyStoredConfig = () => {
      $vuetify.theme.dark = getItem('vuetify.theme.dark') || $vuetify.theme.dark;
      $i18n.locale = getItem('i18n.locale') || $i18n.locale;
    };

    onBeforeMount(applyStoredConfig);

    onMounted(async () => {
      const ids = localStorage.getItem('timetable/ids');

      if (ids !== null) {
        const idObjs: ValidIdParams[] = JSON.parse(ids);
        await request.fetchAndStoreCoursesForTimetable(idObjs);
      }

      if (window.location.pathname === '/') {
        await request.fetchAndStoreCourses('search?');
      } else {
        await request.fetchAndStoreCourses(`search${window.location.search}`);
      }
    });
  },
});
</script>
