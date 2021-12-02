import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import { VueAxios } from '@/utils/request';
import store from './store';
import Storage from 'vue-ls';
import config from '@/defaultSettings';
import vueBus from '@/utils/vueBus';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueAxios);
Vue.use(Storage, config.storageOptions);
Vue.use(vueBus);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
