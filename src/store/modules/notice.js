import { client } from '@/helpers';
import { notice } from '@/api';

const PUBLISH = 'notice/PUBLISH';
const LOAD = 'notice/LOAD';
const DELETE = 'notice/DELETE';

export default {
  state: {
    data: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD] ({ commit }) {
      commit(LOAD, await client.get(notice.load));
    },
    async [PUBLISH] ({ commit }, data) {
      commit(PUBLISH, await client.post(notice.publish, { data }));
    },
    async [DELETE] ({ commit }, { data, index }) {
      await client.delete(notice.delete, { data });
      commit(DELETE, { index });
    }
  },
  mutations: {
    [LOAD] (state, { noticeList }) {
      state.data = {
        value: noticeList,
        loaded: true
      };
    },
    [DELETE] (state, { index }) {
      state.data.value.splice(index, 1);
    },
    [PUBLISH] (state, { notice: noticeItem }) {
      state.data.value.push(noticeItem);
    },
  }
};
