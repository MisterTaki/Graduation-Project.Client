import axios from 'axios';
import { Notification } from 'element-ui';
import store from '../store';
import config from '../config';

const $http = axios.create({
  baseURL: config.baseURL
});

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = (url, { params, data } = {}) => new Promise((resolve, reject) => {
        store.commit('global/TOGGLE_LOADING', 'start');
        const token = window.localStorage.getItem('token');
        if (token) $http.defaults.headers.common.Authorization = token;
        $http({
          method,
          url,
          params,
          data
        }).then((response) => {
          if (response.data.state === 'Success') {
            store.commit('global/TOGGLE_LOADING', 'finish');
            resolve(response.data.result);
          } else {
            Notification.error({
              title: '出错啦',
              message: `错误信息：${response.data.message || '请求出错了'}`
            });
            store.commit('global/TOGGLE_LOADING', 'error');
            reject();
          }
        }).catch((error) => {
          Notification.error({
            title: '出错啦',
            message: `错误信息：${error.response.data.message || '服务器开小差了'}`
          });
          store.commit('global/TOGGLE_LOADING', 'error');
          reject();
        });
      });
    });
  }
}
export default new Client();
