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
    token: getToken()
  },
  actions: {
    async [LOGIN] ({ commit }, { data }) {
      commit(LOGIN, await client.post(apiMap.login, { data }));
    },
    async [LOGOUT] ({ commit }) {
      commit(LOGOUT);
    }
  },
  mutations: {
    [LOGIN] (state, { data }) {
      window.localStorage.setItem('token', data.token);
      state.token = data.token;
    },
    [LOGOUT] (state) {
      window.localStorage.setItem('token', '');
      state.token = '';
    }
  }
};
