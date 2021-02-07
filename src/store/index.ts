import Vue from 'vue';
import Vuex from 'vuex';
import timetable from './modules/timetable';

Vue.use(Vuex);
interface AdvancedInputs {
  giga: string;
  lecturer: string;
  language: string;
  semester: string;
  day: string;
  time: string;
}

export default new Vuex.Store({
  state: {
    searchInput: '',
    advancedInputs: {
      giga: '',
      lecturer: '',
      language: '',
      semester: '',
      day: '',
      time: '',
    } as AdvancedInputs,
  },
  mutations: {
    setAdvancedInputs(state, payload: AdvancedInputs) {
      state.advancedInputs = payload;
    },
    setSearchInput(state, payload: string) {
      state.searchInput = payload;
    },
  },
  actions: {
  },
  modules: {
    timetable,
  },
  strict: process.env.NODE_ENV !== 'production',
});
