import { client } from '@/helpers';
import { group } from '@/api';

const LOAD = 'group/LOAD';

export default {
  state: {
    data: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(group.load));
    }
  },
  mutations: {
    [LOAD] (state, { receiverOptions }) {
      state.data = {
        value: receiverOptions,
        loaded: true
      };
    }
  }
};
