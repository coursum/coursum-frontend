<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleSideBar(!visibility)" />

    <span v-if="isMdAndUp" class="coursum-title" @click="goResult">
      Coursum
    </span>

    <v-spacer />

    <search-input :style="searchBarWidth" class="mx-auto" />
    <advanced-inputs />

    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import {
  computed, defineComponent, provide, reactive, ref,
} from '@vue/composition-api';

import AdvancedInputs from '@/components/search/advanced_inputs.vue';
import SearchInput from '@/components/search/search_input.vue';
import type { AdvancedQuery } from '@/types/Search';
import injectStrict from '@/util/inject-strict';
import {
  advancedQueryKey,
  searchInputKey,
  setAdvancedQueryKey,
  setSearchInputKey,
  toggleSideBarKey,
  visibilityKey,
} from '@/util/injection-keys';

const initialAdvancedQuery = {
  giga: '',
  teacher: '',
  language: '',
  semester: '',
  times: '',
};

const useStoredSearchInput = () => {
  const searchInput = ref('');
  const setSearchInput = (value: string) => {
    searchInput.value = value;
  };

  const advancedQuery = reactive({ ...initialAdvancedQuery });
  const setAdvancedQuery = (value: AdvancedQuery) => {
    Object.assign(advancedQuery, value);
  };

  provide(searchInputKey, searchInput);
  provide(setSearchInputKey, setSearchInput);

  provide(advancedQueryKey, advancedQuery);
  provide(setAdvancedQueryKey, setAdvancedQuery);

  return {
    setSearchInput,
    setAdvancedQuery,
  };
};

const useCoursumTitle = (context: SetupContext, {
  setSearchInput,
  setAdvancedQuery,
}: {
  setSearchInput: (value: string) => void;
  setAdvancedQuery: (value: AdvancedQuery) => void;
}) => {
  const { $vuetify, $router } = context.root;

  const isMdAndUp = computed(() => $vuetify.breakpoint.mdAndUp);

  const goResult = async () => {
    if ($router.currentRoute.path !== '/') {
      await $router.push('/');
      setSearchInput('');
      setAdvancedQuery(initialAdvancedQuery);
    }
  };

  return { isMdAndUp, goResult };
};

const useSearchBarInTopBar = (context: SetupContext) => {
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
  setup: (_, context) => {
    const visibility = injectStrict(visibilityKey);
    const toggleSideBar = injectStrict(toggleSideBarKey);

    const {
      setSearchInput,
      setAdvancedQuery,
    } = useStoredSearchInput();

    const { isMdAndUp, goResult } = useCoursumTitle(context, {
      setSearchInput,
      setAdvancedQuery,
    });

    return {
      visibility,
      toggleSideBar,
      isMdAndUp,
      goResult,
      ...useSearchBarInTopBar(context),
    };
  },
});
</script>

<style scoped>
.coursum-title {
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
