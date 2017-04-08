import Vue from 'vue';
import axios from 'axios';
import { Notification } from 'element-ui';
import { Common } from '@/components';

axios.defaults.baseURL = 'https://api.graduation-project.com/v1';
Vue.$http = axios; // add $http method.

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = async (url, { params, data } = {}) => {
        try {
          Common.LoadingBar.start();
          const response = await Vue.$http({
            method,
            url,
            params,
            data
          });
          Common.LoadingBar.finish();
          return response;
          // if (response.data.status === 200) {
          //   Common.LoadingBar.finish();
          //   return response;
          // }
          // Notification.error({
          //   title: '出错啦',
          //   message: `服务器错误：${response.status}, ${response.statusText}`
          // });
          // Common.LoadingBar.error();
          // throw new Error(response);
        } catch (error) {
          Notification.error({
            title: '出错啦',
            message: `网络请求错误：${error.status}, ${error.statusText}`
          });
          Common.LoadingBar.error();
          throw new Error(error);
        }
      };
    });
  }
}
export default new Client();
