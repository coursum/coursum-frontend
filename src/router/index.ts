import Vue from 'vue';
import type { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import CourseIndex from '@/components/course/course_index.vue';
import DetailIndex from '@/components/detail/detail_index.vue';
import Index from '@/components/index.vue';
import TimetableShow from '@/components/timetable/timetable_show.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/search',
    component: CourseIndex,
  },
  {
    path: '/course/:id',
    component: DetailIndex,
  },
  {
    path: '/timetable',
    component: TimetableShow,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
