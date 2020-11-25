<template>
  <v-app>
    <TopBar />
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TopBar from '@/components/TopBar.vue';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({

  name: 'App',
  components: {
    TopBar,
    NavBar,
  },
  data: () => ({
  }),
  async created() {
    this.getDarkModeState();
    this.$store.commit('getIdsFromLocalStorage');
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
