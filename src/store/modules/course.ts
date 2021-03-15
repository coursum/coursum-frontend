import { CourseInfo } from '@/assets/CourseInfo';

interface State {
  courses: CourseInfo[];
}

export default {
  namespaced: true,
  state: {
    courses: [],
  },
  mutations: {
    setCourses(state: State, courses: CourseInfo[]) {
      state.courses = courses;
    },
  },
};
