import Vue from 'vue';
import axios from 'axios';
import { Notification } from 'element-ui';

const http = axios.create({
  baseURL: 'https://api.graduation-project.com/v1/',
});
Vue.prototype.$http = http; // add $http method.

const methods = ['get', 'post', 'delete', 'put'];
class Client {
  constructor () {
    methods.forEach((method) => {
      this[method] = async (url, { params, data } = {}) => {
        try {
          Vue.$store.commit('global/TOGGLE_LOADING', 'start');
          const response = await Vue.$http[method]({
            url,
            params,
            data
          });
          if (response.data.status === 200) {
            Vue.$store.commit('global/TOGGLE_LOADING', 'finish');
            return response.data;
          }
          Notification.error({
            title: '出错啦',
            message: `服务器错误：${response.status}, ${response.statusText}`
          });
          Vue.$store.commit('global/TOGGLE_LOADING', 'error');
          throw new Error(response.data);
        } catch (error) {
          Notification.error({
            title: '出错啦',
            message: `网络请求错误：${error.status}, ${error.statusText}`
          });
          Vue.$store.commit('global/TOGGLE_LOADING', 'error');
          throw new Error(error);
        }
      };
    });
  }
}
export default new Client();
