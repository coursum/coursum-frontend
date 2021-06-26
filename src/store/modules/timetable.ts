import type { CourseInfo, ValidIdParams } from '@/types/CourseInfo';

interface State {
  courses: CourseInfo[];
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
    addCourse(state: State, addCourse: CourseInfo) {
      state.courses.push(addCourse);
    },
    // timetable_mutation_button.vue
    removeCourse(state: State, removeCourse: ValidIdParams) {
      state.courses = state.courses.filter((course: CourseInfo) => (
        `{"title":"${course.title.name.ja}","teacher":"${course.lecturers[0].name.ja}"}`
        !== `{"title":"${removeCourse.title}","teacher":"${removeCourse.teacher}"}`
      ));
    },
  },
};
