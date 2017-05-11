import { client } from '@/helpers';
import { resource } from '@/api';

const LOAD = 'resource/LOAD';
const UPLOAD = 'resource/UPLOAD';

export default {
  state: {
    data: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(resource.load));
    }
  },
  mutations: {
    [LOAD] (state, { resources }) {
      state.data = {
        value: resources,
        loaded: true
      };
    },
    [UPLOAD] (state, { newResource }) {
      state.data.value.push(newResource);
    },
  }
};
