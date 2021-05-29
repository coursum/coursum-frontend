<template>
  <v-app-bar
    app
    color="primary"
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
import { defineComponent } from '@vue/composition-api';

import CoursumLogo from '@/components/course/coursum_logo.vue';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';
import SearchInput from '@/components/search/search_input.vue';

export default defineComponent({
  name: 'TopBar',
  components: {
    SearchInput,
    AdvancedInputs,
    CoursumLogo,
  },
  setup: (_, context) => {
    const goBack = () => {
      if (window.history.length > 1) {
        context.root.$router.go(-1);
      } else {
        context.root.$router.push('/');
      }
    };

    const changeSideBarState = () => {
      const state = context.root.$store.state.sideBarState;
      context.root.$store.commit('setSideBarState', !state);
    };

    return {
      goBack,
      changeSideBarState,
    };
  },
});
</script>
