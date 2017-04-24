import { client } from '@/helpers';
import { notice } from '@/api';

const PUBLISH = 'notice/PUBLISH';

export default {
  state: {
  },
  actions: {
    async [PUBLISH] ({ commit }, data) {
      await client.post(notice.publish, { data });
    }
  },
  mutations: {
  }
};
