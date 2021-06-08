<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('toogle')" />

    <span v-if="isMdAndUp" class="coursum-title" @click="goResult">
      Coursum
    </span>

    <v-spacer />

    <search-input :style="searchBarWidth" class="mx-auto" />
    <span class="mx-1">
      <keep-alive>
        <advanced-inputs />
      </keep-alive>
    </span>

    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import tool from '@/api/build_query';
import request from '@/api/request';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';
import SearchInput from '@/components/search/search_input.vue';

const useCoursumTitle = (context: SetupContext) => {
  const { $vuetify } = context.root;

  const isMdAndUp = computed(() => $vuetify.breakpoint.mdAndUp);

  // TODO: Dont fetch course in index page, fetch only after search.
  const goResult = async () => {
    await request.fetchAndStoreCourses('');

    tool.goToResultPage('/');
  };

  return { isMdAndUp, goResult };
};

const useSearchBar = (context: SetupContext) => {
  const { $vuetify } = context.root;

  const searchBarWidth = computed(() => {
    let width = '40%';

    if ($vuetify.breakpoint.mdAndDown) width = '60%';
    if ($vuetify.breakpoint.xs) width = '80%';

    return { width };
  });

  return { searchBarWidth };
};

export default defineComponent({
  name: 'TopBar',
  components: {
    AdvancedInputs,
    SearchInput,
  },
  setup: (_, context) => ({
    ...useCoursumTitle(context),
    ...useSearchBar(context),
  }),
});
</script>

<style scoped>
.coursum-title {
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
