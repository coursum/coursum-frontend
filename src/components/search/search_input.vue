<template>
  <v-text-field
    v-model="input"

    class="rounded-lg"

    dense
    filled
    hide-details
    rounded
    prepend-inner-icon="mdi-magnify"
    clearable

    @keydown.enter="search"
  />
</template>

<script lang="ts">
import { SetupContext, defineComponent, ref } from '@vue/composition-api';

import tool from '@/api/build_query';
import request from '@/api/request';

const useSearch = (context: SetupContext) => {
  const { $store } = context.root;

  const input = ref('');

  const search = async () => {
    const searchQuery = tool.buildQuery({
      builder: input.value,
    });

    await request.fetchAndStoreCourses(searchQuery);

    $store.commit('setSearchInput', input.value);

    tool.goToResultPage(`/course/${searchQuery}`);
  };

  return { input, search };
};

export default defineComponent({
  name: 'SearchInput',
  setup: (_, context) => ({
    ...useSearch(context),
  }),
});
</script>
