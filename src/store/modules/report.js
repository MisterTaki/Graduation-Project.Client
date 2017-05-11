import { client } from '@/helpers';
import { report } from '@/api';

const LOAD = 'report/LOAD';
const UPLOAD = 'report/UPLOAD';

export default {
  state: {
    data: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(report.load));
    }
  },
  mutations: {
    [LOAD] (state, { reports }) {
      state.data = {
        value: reports,
        loaded: true
      };
    },
    [UPLOAD] (state, { newReport }) {
      state.data.value.push(newReport);
    },
  }
};
