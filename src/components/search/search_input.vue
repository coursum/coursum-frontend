<template>
  <div
    id="search"
    :style="searchBarWidth"
    class="mx-auto"
  >
    <v-combobox
      :filled="true"
      :dense="true"
      rounded
      class="rounded-lg"
      prepend-inner-icon="mdi-magnify"
      type="text"
      hide-details
      :search-input.sync="input"
      :value="input"
      @keydown.enter="goResult"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, toRefs,
} from '@vue/composition-api';
import tool from '@/api/build_query';
import request from '@/api/request';

export default defineComponent({
  name: 'SearchInput',
  setup: (_, context) => {
    const state = reactive({
      input: '',
    });

    const searchBarWidth = computed((): object => {
      let widthRate;
      const { breakpoint } = context.root.$vuetify;

      if (breakpoint.xs) {
        widthRate = 80;
      } else if (breakpoint.mdAndDown) {
        widthRate = 60;
      } else {
        widthRate = 40;
      }

      return { width: `${widthRate}%` };
    });

    const flat = computed((): boolean => context.root.$route.path !== '/' && !context.root.$route.params.query);

    const goResult = async () => {
      const searchQuery = tool.buildQuery({
        builder: state.input,
      });

      await request.fetchAndStoreCourses(searchQuery);

      context.root.$store.commit('setSearchInput', state.input);

      tool.goToResultPage(`/course/${searchQuery}`);
    };

    return {
      searchBarWidth,
      flat,
      goResult,
      ...toRefs(state),
    };
  },
});
</script>

<style>
#search .v-text-field input {
  padding: 0px;
  line-height: 30px !important;
}

#search .v-icon {
  color: #bdbdbd;
}
</style>
