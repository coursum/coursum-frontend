import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'CourseIndex',
    component: () => import('@/components/course/course_index.vue'),
    children: [
      {
        path: 'search/:id',
      },
      {
        path: 'category/*',
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/components/not_found.vue'),
  },
  {
    path: '/course-detail/:id',
    name: 'DetailShow',
    component: () => import('@/components/detail/detail_show.vue'),
  },
  {
    path: '/timetable',
    name: 'TimetableShow',
    component: () => import('@/components/timetable/timetable_show.vue'),
    children: [
      {
        path: 'shared/:id',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
