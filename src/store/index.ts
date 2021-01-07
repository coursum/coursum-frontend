import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const setTimetable = (ids: string[]) => {
  localStorage.setItem('idsInTimetable', JSON.stringify(ids));
};

const idsType: string[] = [];

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
    idsInTimetable: idsType,
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
    getIdsFromLocalStorage(state) {
      const idsInlocalStorage = localStorage.getItem('idsInTimetable');

      if (typeof idsInlocalStorage === 'string') {
        state.idsInTimetable = JSON.parse(idsInlocalStorage);
      } else {
        setTimetable(state.idsInTimetable);
      }
    },
    addToTimetable(state, payload: string) {
      state.idsInTimetable = [...state.idsInTimetable, payload];

      setTimetable(state.idsInTimetable);
    },
    removeFromTimetable(state, payload: string) {
      state.idsInTimetable = state.idsInTimetable
        .filter((str: string) => str !== payload);

      setTimetable(state.idsInTimetable);
    },
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
  },
});
