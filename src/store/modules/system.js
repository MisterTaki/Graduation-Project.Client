import { client } from '@/helpers';
import { system } from '@/api';

const LOAD = 'system/LOAD';

export default {
  state: {
    status: {
      value: '',
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(system.getStatus));
    }
  },
  mutations: {
    [LOAD] (state, { status }) {
      state.status = {
        value: status,
        loaded: true
      };
    }
  }
};
