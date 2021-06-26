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
import type { SetupContext } from '@vue/composition-api';
import { defineComponent, ref, watch } from '@vue/composition-api';

import { injectStrict } from '@/util';
import { advancedQueryKey, searchInputKey, setSearchInputKey } from '@/util/injectionKeys';
import request from '@/util/request';

const useSearch = (context: SetupContext) => {
  const { $router } = context.root;

  const searchInput = injectStrict(searchInputKey);
  const advancedInputs = injectStrict(advancedQueryKey);
  const setSearchInput = injectStrict(setSearchInputKey);

  const input = ref(searchInput.value);
  watch(searchInput, () => {
    input.value = searchInput.value;
  });

  const search = async () => {
    setSearchInput(input.value);

    const searchQuery = request.buildQuery({
      query: input.value,
      advanced: advancedInputs,
    });

    $router.push(`/search?${searchQuery}`);
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
