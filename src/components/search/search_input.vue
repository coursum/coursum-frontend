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

import type { CourseInfo } from '@/assets/CourseInfo';
import { injectStrict } from '@/util';
import {
  advancedInputsKey, searchInputKey, setLoadingStateKey, setSearchInputKey,
} from '@/util/injectionKeys';
import request from '@/util/request';

const useSearch = (context: SetupContext) => {
  const { $store, $router } = context.root;

  const setLoadingState = injectStrict(setLoadingStateKey);
  const searchInput = injectStrict(searchInputKey);
  const advancedInputs = injectStrict(advancedInputsKey);
  const setSearchInput = injectStrict(setSearchInputKey);

  const input = ref(searchInput.value);
  watch(searchInput, () => {
    input.value = searchInput.value;
  });

  const search = async () => {
    const searchQuery = request.buildQuery({
      query: input.value,
      advanced: advancedInputs,
    });

    $router.push(`search?${searchQuery}`);

    try {
      setLoadingState(true);

      const response = await request.axios.get(`search?${searchQuery}`);
      const courses: CourseInfo[] = response.data.Hits;

      $store.commit('course/setCourses', courses);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoadingState(false);
    }

    setSearchInput(input.value);
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
