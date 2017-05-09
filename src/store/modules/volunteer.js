import { client } from '@/helpers';
import { volunteer } from '@/api';

const LOAD_TEACHER_OPTIONS = 'volunteer/LOAD_TEACHER_OPTIONS';

export default {
  state: {
    teacherOptions: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD_TEACHER_OPTIONS] ({ commit }) {
      commit(LOAD_TEACHER_OPTIONS, await client.get(volunteer.load, {
        params: {
          type: 'option'
        }
      }));
    }
  },
  mutations: {
    [LOAD_TEACHER_OPTIONS] (state, { teachers }) {
      state.teacherOptions = {
        value: teachers,
        loaded: true
      };
    }
  }
};
