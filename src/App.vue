<template>
  <v-app>
    <top-bar v-if="showTopBar" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TopBar from '@/components/bar/top_bar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TopBar,
  },
  computed: {
    showTopBar(): boolean {
      const { path } = this.$route;

      return path !== '/' && !path.startsWith('/search');
    },
  },
  async created() {
    this.$store.commit('getIdsFromLocalStorage');
    this.getThemeState();
    this.getLangState();
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
