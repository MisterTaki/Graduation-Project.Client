import { client } from '@/helpers';
import { auth } from '@/api';

const LOAD = 'auth/LOAD';
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

export default {
  state: {
    token: window.localStorage.getItem('token') || '',
    username: window.localStorage.getItem('username') || '',
    identity: window.localStorage.getItem('identity') || ''
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(auth.load));
    },
    async [LOGIN] ({ commit }, data) {
      commit(LOGIN, await client.post(auth.login, { data }));
    },
    async [LOGOUT] ({ commit }) {
      commit(LOGOUT);
      commit('root/RESET');
    }
  },
  mutations: {
    [LOAD] (state, data) {
      const { username, identity } = data;
      state.username = username;
      state.identity = identity;
    },
    [LOGIN] (state, data) {
      const { token, userInfo: { username, identity } } = data;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('identity', identity);
      state.token = token;
      state.username = username;
      state.identity = identity;
    },
    [LOGOUT] () {
      window.localStorage.clear();
    }
  }
};
