<template>
  <v-app>
    <desktop-bar />
    <mobile-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import DesktopBar from '@/components/DesktopBar.vue';
import MobileBar from '@/components/MobileBar.vue';

export default Vue.extend({

  name: 'App',
  components: {
    DesktopBar,
    MobileBar,
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
