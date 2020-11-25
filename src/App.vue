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
    //
  }),
});
</script>
