<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleSideBar" />

    <!-- <v-btn icon @click="goBack">
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
    CoursumLogo,
    AdvancedInputs,
    SearchInput,
  },
  setup: (_, { root: { $store } }) => {
    // const goBack = () => {
    //   if (window.history.length > 1) {
    //     $router.go(-1);
    //   } else {
    //     $router.push('/');
    //   }
    // };

    const toggleSideBar = () => {
      $store.commit('sidebar/toggle', !$store.state.sidebar.isVisible);
    };

    return {
      // goBack,
      toggleSideBar,
    };
  },
});
</script>
