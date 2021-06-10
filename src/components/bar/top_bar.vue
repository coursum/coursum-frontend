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
import { injectStrict } from '@/util';
import {
  advancedInputsKey,
  searchInputKey,
  setAdvancedInputsKey,
  setSearchInputKey,
  toggleSideBarKey,
  visibilityKey,
} from '@/util/injectionKeys';

const useStoredSearchInput = () => {
  const searchInput = ref('');
  const setSearchInput = (value: string) => {
    searchInput.value = value;
  };

  const advancedInputs = reactive({
    giga: '',
    teacher: '',
    language: '',
    semester: '',
    times: '',
  });
  const setAdvancedInputs = (value: typeof advancedInputs) => {
    Object.assign(advancedInputs, value);
  };

  provide(searchInputKey, searchInput);
  provide(setSearchInputKey, setSearchInput);

  provide(advancedInputsKey, advancedInputs);
  provide(setAdvancedInputsKey, setAdvancedInputs);

  return {
    setSearchInput,
    setAdvancedInputs,
  };
};

const useCoursumTitle = (context: SetupContext) => {
  const { $vuetify, $router } = context.root;

  const isMdAndUp = computed(() => $vuetify.breakpoint.mdAndUp);

  const goResult = () => {
    if ($router.currentRoute.path !== '/') {
      $router.push('/');
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

    useStoredSearchInput();

    return {
      visibility,
      toggleSideBar,
      ...useCoursumTitle(context),
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
