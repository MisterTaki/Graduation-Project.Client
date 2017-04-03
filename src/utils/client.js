import Vue from 'vue';
import axios from 'axios';
import { Notification } from 'element-ui';

const http = axios.create({
  baseURL: 'https://graduation-project.com/api/v1',
});
Vue.prototype.$http = http; // add $http method.

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = (url, { params, data } = {}, cb, errorCb) => {
        Vue.$store.commit('global/TOGGLE_LOADING', 'start');
        Vue.$http({
          method,
          url,
          params,
          data
        }).then((res) => {
          if (res.data.status === 200) {
            Vue.$store.commit('global/TOGGLE_LOADING', 'finish');
            cb(res);
          }
          Vue.$store.commit('global/TOGGLE_LOADING', 'error');
          Notification.error({
            title: '出错啦',
            message: `服务器错误：${res.status}, ${res.statusText}`
          });
          if (errorCb()) errorCb(res);
        }).catch((err) => {
          Vue.$store.commit('global/TOGGLE_LOADING', 'error');
          Notification.error({
            title: '出错啦',
            message: `网络请求错误：${err.status}, ${err.statusText}`
          });
          if (errorCb()) errorCb(err);
        });
      };
    });
  }
}
export default new Client();
