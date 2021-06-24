import type { CourseInfo } from '@/assets/CourseInfo';

interface State {
  course: CourseInfo;
}

export default {
  namespaced: true,
  state: {
    // detail_index.vue
    course: {},
  },
  mutations: {
    // course_show.vue
    setCourse(state: State, course: CourseInfo) {
      state.course = course;
    },
  },
};
