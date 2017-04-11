import axios from 'axios';
import { Notification } from 'element-ui';
import { Common } from '@/components';
import config from '../config';

const $http = axios.create({
  baseURL: config.baseURL
});

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = async (url, { params, data } = {}) => {
        Common.LoadingBar.start();
        const token = window.localStorage.getItem('token');
        if (token) {
          $http.defaults.headers.common.Authorization = token;
        }
        try {
          const response = await $http({
            method,
            url,
            params,
            data
          });
          Common.LoadingBar.finish();
          return response;
        } catch (error) {
          Notification.error({
            title: '出错啦',
            message: `错误信息：${error.response.status}，${error.response.data.message || '服务器开小差了'}`
          });
          Common.LoadingBar.error();
          throw new Error(error);
        }
      };
    });
  }
}
export default new Client();
