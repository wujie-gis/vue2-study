import Vue from 'vue';
import App from './App.vue';
// import VueRouter from 'vue-router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from './router';

Vue.config.productionTip = false;

Vue.use(Antd);
// Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
