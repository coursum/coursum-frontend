<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleSideBar(!visibility)" />

    <span v-if="isMdAndUp" class="coursum-title" @click="goResult">
      Coursum
    </span>

    <v-spacer />

    <the-search-bar :style="searchBarWidth" class="mx-auto" />
    <the-search-filters />

    <v-spacer />
  </v-app-bar>
</template>

<script lang="ts">
import type { SetupContext } from '@vue/composition-api';
import {
  computed, defineComponent, provide, ref,
} from '@vue/composition-api';

import TheSearchBar from '@/components/the-search-bar.vue';
import TheSearchFilters from '@/components/the-search-filters.vue';
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
import useRouter from '@/util/use-router';

const useStoredSearchInput = () => {
  const searchInput = ref('');
  const setSearchInput = (value: string) => {
    searchInput.value = value;
  };

  const advancedQuery = ref<AdvancedQuery>({});
  const setAdvancedQuery = (value: AdvancedQuery) => {
    advancedQuery.value = value;
  };

  provide(searchInputKey, searchInput);
  provide(setSearchInputKey, setSearchInput);

  provide(advancedQueryKey, advancedQuery);
  provide(setAdvancedQueryKey, setAdvancedQuery);

  return {
    searchInput,
    advancedQuery,
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
  const { routerPush } = useRouter(context.root.$router);
  const { $vuetify } = context.root;

  const isMdAndUp = computed(() => $vuetify.breakpoint.mdAndUp);

  const goResult = async () => {
    setSearchInput('');
    setAdvancedQuery({});
    await routerPush('/');
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
  name: 'TheTopBar',
  components: {
    TheSearchFilters,
    TheSearchBar,
  },
  setup: (_, context) => {
    const visibility = injectStrict(visibilityKey);
    const toggleSideBar = injectStrict(toggleSideBarKey);

    const {
      searchInput,
      advancedQuery,
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
      // For debugging in vue developer tool
      // eslint-disable-next-line vue/no-unused-properties
      searchInput,
      // eslint-disable-next-line vue/no-unused-properties
      advancedQuery,
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
