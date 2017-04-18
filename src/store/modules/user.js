import { client } from '../../helpers';
import { user } from '../../api';

const LOAD = 'user/LOAD';
const CREATE = 'user/CREATE';
const APPLY = 'user/APPLY';
const UPDATE = 'user/UPDATE';
const MODIFY_PASSWORD = 'user/MODIFY_PASSWORD';

export default {
  state: {
    info: {}
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(user.loadUser));
    },
    async [CREATE] ({ commit }, data) {
      await client.post(user.createUser, { data });
    },
    async [APPLY] ({ commit }, data) {
      await client.post(user.applyUser, { data });
    },
    async [UPDATE] ({ commit }, data) {
      await client.post(user.updateUser, { data });
    },
    async [MODIFY_PASSWORD] ({ commit }, data) {
      await client.post(user.modifyPwd, { data });
    },
  },
  mutations: {
    [LOAD] (state, { userInfo }) {
      state.info = userInfo;
    },
    // [REGISTER] (state) {
    //
    // },
  }
};
