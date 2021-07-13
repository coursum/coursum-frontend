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

    @input="search"
  />
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import { defineComponent, ref, watch } from '@vue/composition-api';

import injectStrict from '@/util/inject-strict';
import { advancedQueryKey, searchInputKey, setSearchInputKey } from '@/util/injection-keys';
import { buildQuery } from '@/util/request';
import useRouter from '@/util/use-router';

const useSearch = (context: SetupContext) => {
  const { routerPush } = useRouter(context.root.$router);

  const searchInput = injectStrict(searchInputKey);
  const advancedInputs = injectStrict(advancedQueryKey);
  const setSearchInput = injectStrict(setSearchInputKey);

  const input = ref(searchInput.value);
  watch(searchInput, () => {
    input.value = searchInput.value;
  });

  let timer: number;

  const search = async () => {
    window.clearTimeout(timer);

    timer = window.setTimeout(async () => {
      setSearchInput(input.value);

      const searchQuery = buildQuery({ query: input.value, advanced: advancedInputs.value });

      await routerPush(`/search?${searchQuery.toString()}`);
    }, 200);
  };

  return { input, search };
};

export default defineComponent({
  name: 'TheSearchBar',
  setup: (_, context) => ({
    ...useSearch(context),
  }),
});
</script>
