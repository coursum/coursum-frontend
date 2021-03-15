import store from '@/store';
import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || undefined;

export default {
  async fetchAndStoreCourses(query: string) {
    let courses: CourseInfo[] = [];

    try {
      store.commit('setIsLoading', true);

      ({ data: { Hits: courses } } = await axios.get(query));

      store.commit('course/setCourses', courses);
    } catch (e) {
      console.error(e.message);
    } finally {
      store.commit('setIsLoading', false);
    }
  },
};
