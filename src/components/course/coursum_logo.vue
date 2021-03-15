<template>
  <div
    class="primary--text text-center"
    :style="headerStyle"
    @click="goHome"
  >
    Coursum
  </div>
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
