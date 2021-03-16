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
import Vue from 'vue';
import TopBar from '@/components/bar/top_bar.vue';
import SideBar from '@/components/bar/side_bar.vue';
import request from '@/api/request';
import { ValidIdParams } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'App',
  components: {
    TopBar,
    SideBar,
  },
  computed: {
    showTopBar(): boolean {
      const { path } = this.$route;

      return path !== '/' && !path.startsWith('/course/');
    },
  },
  async created() {
    const ids = localStorage.getItem('timetable/ids');

    if (ids !== null) {
      const idObjs: ValidIdParams[] = JSON.parse(ids);
      await request.fetchAndStoreCoursesForTimetable(idObjs);
    }

    this.getThemeState();
    this.getLangState();

    if (window.location.pathname === '/') {
      await request.fetchAndStoreCourses('search?');
    } else {
      await request.fetchAndStoreCourses(`search${window.location.search}`);
    }
  },
  methods: {
    getThemeState() {
      const themeState = localStorage.getItem('themeState');
      if (typeof themeState === 'string') {
        this.$vuetify.theme.dark = JSON.parse(themeState);
      }
    },
    getLangState() {
      const langState = localStorage.getItem('langState');
      if (typeof langState === 'string') {
        this.$root.$i18n.locale = JSON.parse(langState);
      }
    },
  },
});
</script>
