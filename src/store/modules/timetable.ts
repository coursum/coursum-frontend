import type { Course } from 'coursum-types';

interface State {
  courses: Course[];
}

export default {
  namespaced: true,
  state: {
    // timetable_link.vue
    // timetable_show.vue
    // timetable_mutation_button.vue
    courses: [],
  },
  mutations: {
    // App.vue
    // timetable_mutation_button.vue
    addCourse(state: State, addCourse: Course) {
      state.courses.push(addCourse);
    },
    // timetable_mutation_button.vue
    removeCourse(state: State, removeCourseId: Course['yearClassId']) {
      state.courses = state.courses.filter((course) => course.yearClassId !== removeCourseId);
    },
  },
};
