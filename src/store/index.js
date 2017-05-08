import Vue from 'vue';
import Vuex from 'vuex';
import * as modules from './modules';

Vue.use(Vuex);

const RESET = 'root/RESET';
const initializeState = {};

/* eslint no-restricted-syntax: 0 */
for (const key in modules) {
  if (Object.prototype.hasOwnProperty.call(modules, key)) {
    initializeState[key] = JSON.parse(JSON.stringify(modules[key].state));
  }
}

export default new Vuex.Store({
  mutations: {
    [RESET] (state) {
      for (const key in initializeState) {
        if (Object.prototype.hasOwnProperty.call(modules, key)) {
          state[key] = JSON.parse(JSON.stringify(initializeState[key]));
        }
      }
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
});
