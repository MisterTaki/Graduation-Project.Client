import { client } from '@/helpers';
import { notice } from '@/api';

const PUBLISH = 'notice/PUBLISH';
const LOAD = 'notice/LOAD';
const REMOVE = 'notice/REMOVE';
const DELETE = 'notice/DELETE';

export default {
  state: {
    data: []
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(notice.load));
    },
    async [PUBLISH] ({ commit }, data) {
      commit(PUBLISH, await client.post(notice.publish, { data }));
    },
    async [REMOVE] ({ commit }, data) {
      await client.delete(notice.remove, { data });
    }
  },
  mutations: {
    [LOAD] (state, data) {
      state.data = data.noticeList;
    },
    [DELETE] (state, data) {
      state.data.splice(data.index, 1);
    },
    [PUBLISH] (state, data) {
      state.data.push(data.notice);
    },
  }
};
