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
      this[method] = async (url, { params, data } = {}) => {
        store.commit('global/TOGGLE_LOADING', 'start');
        const token = window.localStorage.getItem('token');
        if (token) $http.defaults.headers.common.Authorization = token;
        try {
          const response = await $http({
            method,
            url,
            params,
            data
          });
          store.commit('global/TOGGLE_LOADING', 'finish');
          return response.data;
        } catch (error) {
          Notification.error({
            title: '出错啦',
            message: `错误信息：${error.response.data.message || '服务器开小差了'}`
          });
          store.commit('global/TOGGLE_LOADING', 'error');
          throw new Error(error);
        }
      };
    });
  }
}
export default new Client();
