import axios from 'axios';

import { CourseInfo, ValidIdParams } from '@/assets/CourseInfo';
import store from '@/store';

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
  async fetchAndStoreCourseForTimetable(query: string) {
    let course: CourseInfo | undefined;

    try {
      ({ data: { Hits: [course] } } = await axios.get(query));
      if (course !== undefined) {
        store.commit('timetable/addCourse', course);
      }
    } catch (e) {
      console.error(e.message);
    }
  },
  async fetchAndStoreCoursesForTimetable(idObjs: ValidIdParams[]) {
    try {
      store.commit('setLoadingState', true);

      await idObjs.map((idObj: ValidIdParams) => this.fetchAndStoreCourseForTimetable(`search?query=${idObj.title}&teacher=${idObj.teacher}`));
    } catch (e) {
      console.error(e.message);
    } finally {
      store.commit('setLoadingState', false);
    }
  },
};
