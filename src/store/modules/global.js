import { Common } from '@/components';
import { client } from '../../helpers';
import { academy } from '../../api';

const TOGGLE_LOADING = 'global/TOGGLE_LOADING';
const LOAD_ACADEMY = 'global/LOAD_ACADEMY';

export default {
  state: {
    loading: false,
    academy: []
  },
  actions: {
    async [LOAD_ACADEMY] ({ commit }) {
      commit(LOAD_ACADEMY, await client.get(academy.load));
    }
  },
  mutations: {
    [TOGGLE_LOADING] (state, status) {
      switch (status) {
        case 'start':
          Common.LoadingBar.start();
          state.loading = true;
          break;
        case 'finish':
          Common.LoadingBar.finish();
          state.loading = false;
          break;
        case 'error':
          Common.LoadingBar.error();
          state.loading = false;
          break;
        default:

      }
    },
    [LOAD_ACADEMY] (state, data) {
      state.academy = data;
    }
  }
};
