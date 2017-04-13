import { Common } from '@/components';

const TOGGLE_LOADING = 'global/TOGGLE_LOADING';

export default {
  state: {
    loading: false,
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
    }
  }
};
