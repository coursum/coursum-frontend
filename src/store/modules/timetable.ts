import { CourseInfo, ValidIdParams } from '@/assets/CourseInfo';

const coursesType: CourseInfo[] = [];

interface State {
  courses: CourseInfo[];
}

export default {
  namespaced: true,
  state: {
    courses: coursesType,
  },
  mutations: {
    addCourse(state: State, addCourse: CourseInfo) {
      state.courses.push(addCourse);
    },
    removeCourse(state: State, removeCourse: ValidIdParams) {
      state.courses = state.courses.filter((course: CourseInfo) => `{"title":"${course.title?.name?.jp}","teacher":"${course.lecturers?.[0]?.name?.jp}"}` !== `{"title":"${removeCourse.title}","teacher":"${removeCourse.teacher}"}`);
    },
  },
};
