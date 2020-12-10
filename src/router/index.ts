import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'CourseListPage',
    component: () => import('@/views/CourseListPage.vue'),
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
    name: 'NotFoundPage',
    component: () => import('@/views/NotFoundPage.vue'),
  },
  {
    path: '/course-detail/*',
    name: 'CourseDetailPage',
    component: () => import('@/views/CourseDetailPage.vue'),
  },
  {
    path: '/setting',
    name: 'SettingPage',
    component: () => import('@/views/SettingPage.vue'),
  },
  {
    path: '/timetable',
    name: 'TimeTablePage',
    component: () => import('@/views/TimeTablePage.vue'),
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
