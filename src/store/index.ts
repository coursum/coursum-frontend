import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

Vue.use(Vuex);

const courses: CourseInfo[] = [];

const setTimetable = (ids: string[]) => {
  localStorage.setItem('idsInTimetable', JSON.stringify(ids));
};

const idsType: string[] = [];

export default new Vuex.Store({
  state: {
    isLoading: false,
    courseDatas: courses,
    length: 0,
    idsInTimetable: idsType,
  },
  mutations: {
    async fetchData(state, search: string) {
      const url = new URL('http://54.248.214.173:8000/search');
      url.search = search;

      state.isLoading = true;

      try {
        const response = await axios.get(url.href);
        const datas = JSON.parse(JSON.stringify(response.data)).Hits;
        state.courseDatas = datas;
        if (state.courseDatas === null) {
          throw new Error();
        } else {
          state.length = state.courseDatas.length;
        }
      } catch (e) {
        state.courseDatas = courses;
      } finally {
        state.isLoading = false;
      }
    },
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
