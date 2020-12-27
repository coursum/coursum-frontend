<template>
  <v-app>
    <!-- <mobile-bar /> -->
    <v-main>
      <!-- <desktop-bar /> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import DesktopBar from '@/components/DesktopBar.vue';
// import MobileBar from '@/components/MobileBar.vue';

export default Vue.extend({

  name: 'App',
  components: {
    // DesktopBar,
    // MobileBar,
  },
  data: () => ({
  }),
  async created() {
    this.$store.commit('fetchData', '');
    this.$store.commit('getIdsFromLocalStorage');
    this.getDarkModeState();
  },

  methods: {
    getDarkModeState() {
      const darkModeState = localStorage.getItem('darkModeState');
      if (typeof darkModeState === 'string') {
        this.$vuetify.theme.dark = Boolean(JSON.parse(darkModeState));
      }
    },
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

#app {
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
