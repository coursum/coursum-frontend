import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import CourseIndex from '@/components/course/course_index.vue';
import DetailIndex from '@/components/detail/detail_index.vue';
import Main from '@/components/main/main.vue';
import TimetableShow from '@/components/timetable/timetable_show.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        component: CourseIndex,
      },
      {
        path: 'course/:query',
        component: CourseIndex,
      },
    ],
  },
  {
    path: '/course-detail/:id',
    name: 'DetailIndex',
    component: DetailIndex,
  },
  {
    path: '/timetable',
    name: 'TimetableShow',
    component: TimetableShow,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
