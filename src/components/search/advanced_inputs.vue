<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ attrs, on }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon class="mx-2">
          mdi-tune
        </v-icon>
      </v-btn>
    </template>

    <v-card class="px-12 py-6">
      <div class="d-flex align-center">
        <search-input />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("giga") }}
        </div>
        <v-checkbox v-model="giga" class="pa-0 ma-0" hide-details />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("lecturer") }}
        </div>
        <v-text-field v-model="teacher" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("language") }}
        </div>
        <v-select v-model="language" :items="languages" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("semester") }}
        </div>
        <v-select v-model="semester" :items="semesters" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("day") }}
        </div>
        <v-select v-model="day" :items="days" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("time") }}
        </div>
        <v-select v-model="time" :items="times" dense hide-details solo />
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="resetValues">
          reset
        </v-btn>
        <v-btn @click="advancedSearch">
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, toRefs, watch,
} from '@vue/composition-api';
import type { SetupContext } from '@vue/composition-api';

import SearchInput from '@/components/search/search_input.vue';
import type { AdvancedQuery } from '@/types/Search';
import injectStrict from '@/util/inject-strict';
import { advancedQueryKey, searchInputKey, setAdvancedQueryKey } from '@/util/injection-keys';
import request from '@/util/request';

const useTranslate = (context: SetupContext) => {
  const translateArray = (keys: string[]) => keys.map((key) => context.root.$i18n.t(key));

  const languages = computed(() => translateArray(['english', 'japanese']));

  const semesters = computed(() => translateArray(['spring', 'autumn']));

  const days = computed(() => translateArray(
    ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  ));

  const times = computed(() => (
    Array(7).fill(0)
      .map((_, num) => num + 1)
      .map((period) => `${period} ${context.root.$i18n.t('period')}`)
  ));

  return {
    languages,
    semesters,
    times,
    days,
  };
};

export default defineComponent({
  name: 'AdvancedInputs',
  components: {
    SearchInput,
  },
  setup: (_, context) => {
    const { $router } = context.root;

    const searchInput = injectStrict(searchInputKey);
    const advancedInputs = injectStrict(advancedQueryKey);
    const setAdvancedQuery = injectStrict(setAdvancedQueryKey);

    const initialState = {
      teacher: '',
      semester: '',
      day: '',
      time: '',
      language: '',
      giga: false,
    };

    const dialog = ref(false);
    const state = reactive({ ...initialState });

    watch(advancedInputs, () => {
      // TODO: try to refill day & time
      const { times: _, ...rest } = advancedInputs;
      Object.assign(state, rest);
    });

    const resetValues = () => {
      Object.assign(state, initialState);
    };

    const advancedSearch = async () => {
      dialog.value = false;

      const advanced: AdvancedQuery = {};
      if (state.teacher) advanced.teacher = state.teacher;
      if (state.semester) advanced.semester = state.semester;
      if (state.day && state.time) advanced.times = `${state.day}${state.time}`;
      if (state.language) advanced.language = state.language;
      if (state.giga) advanced.giga = '';

      setAdvancedQuery(advanced);

      const searchQuery = request.buildQuery({
        query: searchInput.value,
        advanced,
      });

      $router.push(`/search?${searchQuery}`);
    };

    return {
      dialog,
      ...toRefs(state),
      ...useTranslate(context),
      resetValues,
      advancedSearch,
    };
  },
});
</script>

<style scoped>
.input-label {
  width: 100px;
  margin: 15px;
}
</style>
