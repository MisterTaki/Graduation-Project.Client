import { Common } from '@/components';
import * as types from '../types';

export default {
  state: {
    loading: 'finish',
  },
  mutations: {
    [types.TOGGLE_LOADING] (state, payload) {
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
