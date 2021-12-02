import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import { VueAxios } from './axios';
import router from '@/router/index';
import { ACCESS_TOKEN, TENANT_ID } from '@/store/mutation-types';

/**
 * 【指定 axios的 baseURL】
 */
// let apiBaseUrl = window._CONFIG['domianURL'] || '/jeecg-boot';
let apiBaseUrl = process.env.BASE_URL;

// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 9000, // 请求超时时间
});

const err = error => {
  if (error.response) {
    let data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    // console.log('------异常响应------', token);
    console.log('------异常响应------', error.response.status);
    switch (error.response.status) {
      case 403:
        // 拒绝访问
        break;
      case 500:
        console.log('------error.response------', error.response);
        // update-begin- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
        // eslint-disable-next-line no-case-declarations
        let type = error.response.request.responseType;
        if (type === 'blob') {
          blobToJson(data);
          break;
        }
        // update-end- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
        if (token && data.message.includes('Token失效')) {
          // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          if (/wxwork|dingtalk/i.test(navigator.userAgent)) {
            // 登录已过期，正在重新登陆
          } else {
            //  很抱歉，登录已过期，请重新登录
          }
        }
        break;
      case 404:
        // 很抱歉，资源未找到!
        break;
      case 504:
        // 网络超时
        break;
      case 401:
        // 很抱歉，登录已过期，请重新登录

        break;
      default:
        // 系统提示
        break;
    }
  } else if (error.message) {
    if (error.message.includes('timeout')) {
      // 网络超时
    } else {
      // 系统提示
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (token) {
      config.headers['X-Access-Token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(response => {
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  },
};
/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  let fileReader = new FileReader();
  let token = Vue.ls.get(ACCESS_TOKEN);
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(this.result); // 说明是普通对象数据，后台转换失败
      console.log('jsonData', jsonData);
      if (jsonData.status === 500) {
        console.log('token----------》', token);
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log('blob解析fileReader返回err', err);
    }
  };
  fileReader.readAsText(data);
}

export { installer as VueAxios, service as axios };
