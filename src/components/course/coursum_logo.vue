<template>
  <div
    v-if="isMdAndUp"
    class="primary--text text-center"
    :style="logoStyle"
    @click="goResult"
  >
    Coursum
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import request from '@/api/request';
import tool from '@/api/build_query';

export default Vue.extend({
  name: 'CoursumLogo',
  computed: {
    logoStyle(): object {
      return { 'font-size': '1.1rem', cursor: 'pointer' };
    },
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
  },
  methods: {
    async goResult() {
      await request.fetchAndStoreCourses('search?');

      tool.goToResultPage('/');
    },
  },
});
</script>
