import { auth } from '../../apis';

const LOGIN = 'auth/LOGIN';
// const LOGOUT = 'auth/LOGOUT';
// const UPDATE = 'auth/UPDATE';
const SET_USER = 'auth/SET_USER';

export default {
  state: {
    user: {},
    info: {}
  },
  actions: {
    [LOGIN] ({ commit }, { data }) {
      auth.login(data, (res) => {
        commit('auth/LOGIN', res.data);
      }, () => {
        commit('auth/LOGIN');
      });
    }
  },
  mutations: {
    [LOGIN] (state, { info }) {
      state.info = info;
    },
    [SET_USER] (state, { user }) {
      state.user = user;
    }
  }
};
