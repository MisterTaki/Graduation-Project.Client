import { client } from '@/helpers';
import { system } from '@/api';

const LOAD = 'system/LOAD';
const OBTAIN = 'system/OBTAIN';
const MODIFY = 'system/MODIFY';

export default {
  state: {
    status: {
      value: '',
      loaded: false
    },
    status_startAt: {
      value: '',
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(system.load));
    },
    async [OBTAIN] ({ commit }) {
      commit(OBTAIN, await client.get(system.obtain));
    },
    async [MODIFY] ({ commit }, data) {
      await client.post(system.modify, { data });
      commit(MODIFY, data);
    }
  },
  mutations: {
    [LOAD] (state, { status }) {
      state.status = {
        value: status,
        loaded: true
      };
    },
    [OBTAIN] (state, { status_startAt }) {
      state.status_startAt = {
        value: status_startAt,
        loaded: true
      };
    },
    /* eslint camelcase: 0 */
    [MODIFY] (state, { status_startAt }) {
      state.status_startAt.value = status_startAt;
    }
  }
};
