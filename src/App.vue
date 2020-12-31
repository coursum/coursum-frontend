<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  name: 'App',
  data: () => ({
  }),
  async created() {
    this.$store.commit('fetchData', '');
    this.$store.commit('getIdsFromLocalStorage');
    this.getDarkModeState();
    this.getSwitchLang();
  },

  methods: {
    getDarkModeState() {
      const darkModeState = localStorage.getItem('darkModeState');
      if (typeof darkModeState === 'string') {
        this.$vuetify.theme.dark = Boolean(JSON.parse(darkModeState));
      }
    },
    getSwitchLang() {
      const switchLang = localStorage.getItem('switchLang');
      if (typeof switchLang === 'string') {
        this.$root.$i18n.locale = JSON.parse(switchLang);
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
