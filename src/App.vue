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
import { defineComponent, onMounted, computed } from '@vue/composition-api';
import TopBar from '@/components/bar/top_bar.vue';
import SideBar from '@/components/bar/side_bar.vue';
import request from '@/api/request';
import { ValidIdParams } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'App',
  components: {
    TopBar,
    SideBar,
  },
  setup: (_, context) => {
    const showTopBar = computed((): boolean => {
      const { path } = context.root.$route;

      return path !== '/' && !path.startsWith('/course/');
    });

    const getThemeState = () => {
      const themeState = localStorage.getItem('themeState');
      if (typeof themeState === 'string') {
        // context.root.$vuetify.theme.dark = JSON.parse(themeState);
      }
    };

    const getLangState = () => {
      const langState = localStorage.getItem('langState');
      if (typeof langState === 'string') {
        // context.root.$i18n.locale = JSON.parse(langState);
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
