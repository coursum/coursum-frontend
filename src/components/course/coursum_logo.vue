<template>
  <span
    class="primary--text"
    :style="headerStyle"
    style="font-family: 'Press Start 2P', cursive;"
    @click="goHome"
  >
    Coursum
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CoursumLogo',
  computed: {
    headerStyle(): object {
      return { 'font-size': `${this.$vuetify.breakpoint.mdAndUp ? 2.5 : 2}rem`, cursor: 'pointer' };
    },
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
