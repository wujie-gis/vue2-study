import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Login from '../views/login/Login';

Vue.use(Router);

const constantRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login'),
    // component: Login,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
];

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
