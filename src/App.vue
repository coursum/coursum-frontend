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
import { defineComponent, onMounted } from '@vue/composition-api';

import request from '@/api/request';
import { ValidIdParams } from '@/assets/CourseInfo';
import SideBar from '@/components/bar/side_bar.vue';
import TopBar from '@/components/bar/top_bar.vue';

export default defineComponent({
  name: 'App',
  components: {
    TopBar,
    SideBar,
  },
  setup: (_, context) => {
    const getThemeState = () => {
      const themeState = localStorage.getItem('themeState');
      if (typeof themeState === 'string') {
        //
      }
    };

    const getLangState = () => {
      const langState = localStorage.getItem('langState');
      if (typeof langState === 'string') {
        // eslint-disable-next-line no-param-reassign
        context.root.$i18n.locale = JSON.parse(langState);
      }
    };

    onMounted(async () => {
      const ids = localStorage.getItem('timetable/ids');

      if (ids !== null) {
        const idObjs: ValidIdParams[] = JSON.parse(ids);
        await request.fetchAndStoreCoursesForTimetable(idObjs);
      }

      getThemeState();
      getLangState();

      if (window.location.pathname === '/') {
        await request.fetchAndStoreCourses('search?');
      } else {
        await request.fetchAndStoreCourses(`search${window.location.search}`);
      }
    });
  },
});
</script>
