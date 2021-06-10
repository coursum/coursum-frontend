import type { CourseInfo } from '@/assets/CourseInfo';

interface State {
  courses: CourseInfo[];
  course: CourseInfo;
}

export default {
  namespaced: true,
  state: {
    // detail_index.vue
    course: {},
    // course_index.vue
    courses: [],
  },
  mutations: {
    // course_show.vue
    setCourse(state: State, course: CourseInfo) {
      state.course = course;
    },
    // search_input.vue
    // advanced_inputs.vue
    setCourses(state: State, courses: CourseInfo[]) {
      state.courses = courses;
    },
  },
};
