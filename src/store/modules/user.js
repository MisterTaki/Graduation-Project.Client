import { client } from '@/helpers';
import { user } from '@/api';

const LOAD = 'user/LOAD';
const CREATE = 'user/CREATE';
const APPLY = 'user/APPLY';
const UPDATE = 'user/UPDATE';
const FORGET_PASSWORD = 'user/FORGET_PASSWORD';
const SET_PASSWORD = 'user/SET_PASSWORD';
const MODIFY_PASSWORD = 'user/MODIFY_PASSWORD';
const MODIFY_EMAIL = 'user/MODIFY_EMAIL';
const SET_EMAIL = 'user/SET_EMAIL';

export default {
  state: {
    info: {}
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(user.load));
    },
    async [CREATE] ({ commit }, data) {
      await client.post(user.create, { data });
    },
    async [APPLY] ({ commit }, data) {
      await client.post(user.apply, { data });
    },
    async [UPDATE] ({ commit }, data) {
      await client.post(user.update, { data });
    },
    async [MODIFY_PASSWORD] ({ commit }, data) {
      await client.post(user.modifyPwd, { data });
    },
    async [FORGET_PASSWORD] ({ commit }, data) {
      await client.post(user.forgetPwd, { data });
    },
    async [SET_PASSWORD] ({ commit }, data) {
      await client.post(user.setPwd, { data });
    },
    async [MODIFY_EMAIL] ({ commit }, data) {
      await client.post(user.modifyEmail, { data });
    },
    async [SET_EMAIL] ({ commit }, data) {
      commit(SET_EMAIL, await client.post(user.setEmail, { data }));
    },
  },
  mutations: {
    [LOAD] (state, data) {
      state.info = data;
    },
    [SET_EMAIL] (state, data) {
      state.info.email = data.newEmail;
    }
  }
};
