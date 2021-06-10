import Vue from 'vue';
import Vuex from 'vuex';

import course from './modules/course';
import timetable from './modules/timetable';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    course,
    timetable,
  },
  strict: process.env.NODE_ENV !== 'production',
});
