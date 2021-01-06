import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const setTimetable = (ids: string[]) => {
  localStorage.setItem('idsInTimetable', JSON.stringify(ids));
};

const idsType: string[] = [];

export default new Vuex.Store({
  state: {
    idsInTimetable: idsType,
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
  },
  actions: {
  },
  modules: {
  },
});
