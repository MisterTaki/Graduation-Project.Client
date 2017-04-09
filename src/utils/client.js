import axios from 'axios';
import { Notification } from 'element-ui';
import { Common } from '@/components';

const $http = axios.create({
  baseURL: '/api/v1'
});

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = async (url, { params, data } = {}) => {
        Common.LoadingBar.start();
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
            message: `错误信息：${error.response.status}，${error.response.statusText}`
          });
          Common.LoadingBar.error();
          throw new Error(error);
        }
      };
      // this[method] = (url, { params, data } = {}) => new Promise((resolve, reject) => {
      //   Common.LoadingBar.start();
      //   $http({
      //     method,
      //     url,
      //     params,
      //     data
      //   }).then((response) => {
      //     if (response.status === 200) {
      //       Common.LoadingBar.finish();
      //       resolve(response);
      //     } else {
      //       Notification.error({
      //         title: '出错啦',
      //         message: '服务器开小差了，请稍后重试'
      //       });
      //       Common.LoadingBar.error();
      //       reject(`Error: Request failed with status code ${response.status}`);
      //     }
      //   }).catch((error) => {
      //     Notification.error({
      //       title: '出错啦',
      //       message: `网络请求错误：${error.status}, ${error.statusText}`
      //     });
      //     Common.LoadingBar.error();
      //     reject(error);
      //   });
      // });
    });
  }
}
export default new Client();
