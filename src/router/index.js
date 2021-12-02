import Vue from 'vue';
import Router from 'vue-router';

import modules from './modules';

Vue.use(Router);

const routes = [
  ...modules,
  {
    path: '/',
    redirect: '/dashboard',
  },
];

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes,
});
