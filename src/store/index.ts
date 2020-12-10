import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';
import { CourseInfo } from '@/assets/CourseInfo';

Vue.use(Vuex);

const courses: CourseInfo[] = [];

const setTimetable = (timetable: string) => {
  localStorage.setItem('idsInTimetable', timetable);
};

export default new Vuex.Store({
  state: {
    isLoading: false,
    courseDatas: courses,
    length: 0,
    idsInTimetable: [''],
  },
  mutations: {
    async fetchData(state, search: string) {
      const url = new URL('http://54.248.214.173:8000/search');
      url.search = search;
      state.isLoading = true;
      try {
        const response = await axios.get(url.href);
        state.courseDatas = JSON.parse(JSON.stringify(response.data)).Hits;
        if (state.courseDatas === null) {
          throw new Error();
        } else {
          state.length = state.courseDatas.length;
        }
      } catch (e) {
        state.courseDatas = courses;
        router.push('/404');
      } finally {
        state.isLoading = false;
      }
    },
    getIdsFromLocalStorage(state) {
      const idsInlocalStorage = localStorage.getItem('idsInTimetable');
      if (typeof idsInlocalStorage === 'string') {
        state.idsInTimetable = JSON.parse(idsInlocalStorage);
      } else {
        setTimetable(JSON.stringify(state.idsInTimetable));
      }
    },
    addToTimetable(state, payload: string) {
      state.idsInTimetable = [...state.idsInTimetable, payload];
      setTimetable(JSON.stringify(state.idsInTimetable));
    },
    removeFromTimetable(state, payload: string) {
      state.idsInTimetable = state.idsInTimetable.filter((id) => id !== payload);
      setTimetable(JSON.stringify(state.idsInTimetable));
    },
  },
  actions: {
  },
  modules: {
  },
});
