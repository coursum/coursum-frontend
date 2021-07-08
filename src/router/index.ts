import Vue from 'vue';
import type { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import Index from '@/components/index.vue';
import TheCourseList from '@/components/the-course-list.vue';
import TheCourse from '@/components/the-course.vue';
import TheTimetable from '@/components/the-timetable.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/search',
    component: TheCourseList,
  },
  {
    path: '/course/:id',
    component: TheCourse,
  },
  {
    path: '/timetable',
    component: TheTimetable,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
