import { client } from '@/helpers';
import { system } from '@/api';

const GET_STATUS = 'system/GET_STATUS';

export default {
  state: {
    status: 0
  },
  actions: {
    async [GET_STATUS] ({ commit }) {
      commit(GET_STATUS, await client.get(system.getStatus));
    }
  },
  mutations: {
    [GET_STATUS] (state, { status }) {
      state.status = status;
    }
  }
};
