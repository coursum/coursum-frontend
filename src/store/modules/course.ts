import { CourseInfo } from '@/assets/CourseInfo';

interface State {
  courses: CourseInfo[];
  course: CourseInfo;
}

export default {
  namespaced: true,
  state: {
    courses: [],
    course: {},
  },
  mutations: {
    setCourses(state: State, courses: CourseInfo[]) {
      state.courses = courses;
    },
    setCourse(state: State, course: CourseInfo) {
      state.course = course;
    },
  },
};
