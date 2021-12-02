import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { VueAxios } from '@/utils/request';
import store from './store';
import Storage from 'vue-ls';
import config from '@/defaultSettings';
import vueBus from '@/utils/vueBus';

import Antd, { version } from 'ant-design-vue';
console.log('ant-design-vue version:', version);
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueAxios);
Vue.use(Storage, config.storageOptions);
Vue.use(vueBus);

//表单验证
import { rules } from '@/utils/rules';
Vue.prototype.rules = rules;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
