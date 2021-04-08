import Vue from 'vue';
import Vuex from 'vuex';
import { AdvancedInputs } from '@/assets/SearchInfo';
import course from './modules/course';
import timetable from './modules/timetable';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    sideBarState: false,
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
    setSideBarState(state, sideBarState: boolean) {
      state.sideBarState = sideBarState;
    },
    updateCurrentSelectedPage(state, updatedValue: number) {
      state.currentSelectedPage = updatedValue;
    },
  },
  actions: {
  },
  modules: {
    course,
    timetable,
  },
  strict: process.env.NODE_ENV !== 'production',
});
