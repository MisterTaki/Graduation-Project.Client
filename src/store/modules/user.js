import { client } from '../../helpers';
import apiMap from '../../api';

const REGISTER_STUDENT = 'user/REGISTER_STUDENT';
// const REGISTER_TEACHER = 'user/REGISTER_TEACHER';
// const REGISTER_ADMIN = 'user/REGISTER_ADMIN';

export default {
  state: {

  },
  actions: {
    async [REGISTER_STUDENT] ({ commit }, { data }) {
      commit(REGISTER_STUDENT, await client.post(apiMap.registerStudent, { data }));
    },
  },
  mutations: {
    [REGISTER_STUDENT] (state, { data }) {
      state.registerInfo = data;
    }
  }
};
