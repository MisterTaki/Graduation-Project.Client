import { client } from '../../helpers';
import apiMap from '../../api';

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

function getToken () {
  const token = window.localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if (payload.exp > Date.now() / 1000) {
      return token;
    }
  }
  return '';
}

export default {
  state: {
    token: getToken(),
    username: '',
    identity: ''
  },
  actions: {
    async [LOGIN] ({ commit }, data) {
      commit(LOGIN, await client.post(apiMap.login, { data }));
    },
    async [LOGOUT] ({ commit }) {
      commit(LOGOUT);
    }
  },
  mutations: {
    [LOGIN] (state, { result }) {
      const { token, userInfo: { name: username, identity } } = result;
      window.localStorage.setItem('token', token);
      state.token = token;
      state.username = username;
      state.identity = identity;
    },
    [LOGOUT] (state) {
      window.localStorage.setItem('token', '');
      state.token = '';
    }
  }
};
