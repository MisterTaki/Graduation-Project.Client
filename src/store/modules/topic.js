import { client } from '@/helpers';
import { topic } from '@/api';

const ADD = 'topic/ADD';
const LOAD = 'topic/LOAD';

export default {
  state: {
    data: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(topic.load));
    },
    async [ADD] ({ commit }, data) {
      await client.post(topic.add, { data });
      commit(ADD, {
        newTopics: data.topics
      });
    }
  },
  mutations: {
    [LOAD] (state, { topics }) {
      state.data = {
        value: topics,
        loaded: true
      };
    },
    [ADD] (state, { newTopics }) {
      state.data.value = state.data.value.concat(newTopics);
    },
  }
};
