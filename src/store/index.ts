import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

Vue.use(Vuex);

interface Basic {
  en: string | null;
  jp: string | null;
  kana: string |null;
}

interface Lecturer {
  imgUrl: string | null;
  name: Basic;
  id: string | null;
  email: string | null;
  inCharge: boolean | null;
}

interface Title {
  postscript: Basic;
  name: Basic;
}

interface Schedule {
  year: number | null;
  span: Basic;
  semester: Basic;
  times: Basic;
}

interface Registration {
  number: null;
  suggestion: Basic;
  requirement: Basic;
  prerequisite: null;
}

interface CourseInfo {
  category: Basic;
  language: Basic;
  lecturers: Lecturer[];
  title: Title;
  schedule: Schedule;
  related: null;
  registration: Registration;
  classroom: string | null;
  summary: Basic;
  types: null;
  yearClassId: null;
  tag: {giga: boolean };
  curriculumCode: string | null;
  credit: number | null;
}

const courses: CourseInfo[] = [];

const setTimetable = (timetable: string) => {
  localStorage.setItem('idsInTimetable', timetable);
};

export default new Vuex.Store({
  state: {
    isLoading: false,
    courseDatas: courses,
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
      } catch (e) {
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
