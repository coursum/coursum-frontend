<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleSideBar" />

    <!-- <v-btn icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn> -->

    <span v-if="isMdAndUp" class="coursum-logo" @click="goResult">
      Coursum
    </span>

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
import { computed, defineComponent } from '@vue/composition-api';

import tool from '@/api/build_query';
import request from '@/api/request';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';
import SearchInput from '@/components/search/search_input.vue';

export default defineComponent({
  name: 'TopBar',
  components: {
    AdvancedInputs,
    SearchInput,
  },
  setup: (_, { root: { $store, $vuetify } }) => {
    // const goBack = () => {
    //   if (window.history.length > 1) {
    //     $router.go(-1);
    //   } else {
    //     $router.push('/');
    //   }
    // };

    const isMdAndUp = computed(() => $vuetify.breakpoint.mdAndUp);

    // TODO: Dont fetch course in index page, fetch only after search.
    const goResult = async () => {
      await request.fetchAndStoreCourses('search?');

      tool.goToResultPage('/');
    };

    const toggleSideBar = () => {
      $store.commit('sidebar/toggle', !$store.state.sidebar.isVisible);
    };

    return {
      // goBack,
      isMdAndUp,
      goResult,
      toggleSideBar,
    };
  },
});
</script>

<style scoped>
.coursum-logo {
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
