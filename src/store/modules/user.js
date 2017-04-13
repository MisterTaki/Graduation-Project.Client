import { client } from '../../helpers';
import apiMap from '../../api';

const LOAD = 'user/LOAD';
const CREATE = 'user/CREATE';
const UPDATE = 'user/UPDATE';
const MODIFY_PASSWORD = 'user/MODIFY_PASSWORD';

export default {
  state: {
    info: {}
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(apiMap.loadUser));
    },
    async [CREATE] ({ commit }, { data }) {
      await client.post(apiMap.createUser, { data });
    },
    async [UPDATE] ({ commit }, { data }) {
      await client.post(apiMap.updateUser, { data });
    },
    async [MODIFY_PASSWORD] ({ commit }, { data }) {
      await client.post(apiMap.modifyPwd, { data });
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
