<template>
  <v-app-bar
    app
    color="white"
  >
    <v-app-bar-nav-icon @click.stop="changeSideBarState" />

    <!-- <v-btn
      icon
      @click="goBack"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn> -->

    <coursum-logo />

    <v-spacer />

    <search-input />

    <span class="mx-1">
      <keep-alive>
        <advanced-inputs />
      </keep-alive>
    </span>
    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchInput from '@/components/search/search_input.vue';
import CoursumLogo from '@/components/course/coursum_logo.vue';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';

export default Vue.extend({
  name: 'TopBar',
  components: {
    SearchInput,
    AdvancedInputs,
    CoursumLogo,
  },

  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    changeSideBarState() {
      const state = this.$store.state.sideBarState;
      this.$store.commit('setSideBarState', !state);
    },
  },
});
</script>
