import store from '@/store';
import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || undefined;

export default {
  async fetchAndStoreCourses(query: string) {
    let courses: CourseInfo[] = [];

    try {
      store.commit('setLoadingState', true);

      ({ data: { Hits: courses } } = await axios.get(query));

      store.commit('course/setCourses', courses);
    } catch (e) {
      console.error(e.message);
    } finally {
      store.commit('setLoadingState', false);
    }
  },
  async fetchAndStoreCourse(query: string) {
    let course: CourseInfo | {} = {};

    try {
      store.commit('setLoadingState', true);

      ({ data: { Hits: [course] } } = await axios.get(query));

      store.commit('course/setCourse', course);
    } catch (e) {
      console.error(e.message);
    } finally {
      store.commit('setLoadingState', false);
    }
  },
};
