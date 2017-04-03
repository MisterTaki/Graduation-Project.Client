import { Common } from '@/components';

const TOGGLE_LOADING = 'global/TOGGLE_LOADING';

export default {
  state: {
    loading: 'finish',
  },
  mutations: {
    [TOGGLE_LOADING] (state, payload) {
      switch (payload.status) {
        case 'start':
          Common.LoadingBar.start();
          break;
        case 'finish':
          Common.LoadingBar.finish();
          break;
        case 'error':
          Common.LoadingBar.error();
          break;
        default:

      }
      state.loading = payload.status;
    }
  }
};
