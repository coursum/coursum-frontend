import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CourseList from '../views/CourseList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'CourseList',
    component: CourseList,
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/category/*',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPage.vue'),
  },
  {
    path: '/setting',
    name: 'SettingPage',
    component: () => import('@/views/SettingPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
