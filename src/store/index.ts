import Vue from 'vue';
import Vuex from 'vuex';

import course from './modules/course';
import sidebar from './modules/sidebar';
import timetable from './modules/timetable';

import type { AdvancedInputs } from '@/assets/SearchInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    searchInput: '',
    currentSelectedPage: 1,
    advancedInputs: {
      giga: '',
      teacher: '',
      language: '',
      semester: '',
      times: '',
    } as AdvancedInputs,
  },
  mutations: {
    setAdvancedInputs(state, payload: AdvancedInputs) {
      state.advancedInputs = payload;
    },
    setSearchInput(state, payload: string) {
      state.searchInput = payload;
    },
    setLoadingState(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    updateCurrentSelectedPage(state, updatedValue: number) {
      state.currentSelectedPage = updatedValue;
    },
  },
  actions: {
  },
  modules: {
    course,
    sidebar,
    timetable,
  },
  strict: process.env.NODE_ENV !== 'production',
});
