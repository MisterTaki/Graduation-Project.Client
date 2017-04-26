import { client } from '@/helpers';
import { message } from '@/api';

const SEND = 'message/SEND';
const LOAD_RECEIVE = 'message/LOAD_RECEIVE';
const LOAD_SEND = 'message/LOAD_SEND';
// const MARK = 'message/MARK';
// const DELETE = 'message/DELETE';

export default {
  state: {
    receive: {
      value: [],
      loaded: false
    },
    send: {
      value: [],
      loaded: false
    }
  },
  actions: {
    async [LOAD_RECEIVE] ({ commit }) {
      commit(LOAD_RECEIVE, await client.get(message.load, {
        params: {
          type: 'receive'
        }
      }));
    },
    async [LOAD_SEND] ({ commit }) {
      commit(LOAD_SEND, await client.get(message.load, {
        params: {
          type: 'send'
        }
      }));
    },
    async [SEND] ({ commit }, data) {
      commit(SEND, await client.post(message.send, { data }));
    },
  },
  mutations: {
    [LOAD_RECEIVE] (state, { messageList }) {
      state.receive = {
        value: messageList,
        loaded: true
      };
    },
    [LOAD_SEND] (state, { messageList }) {
      state.send = {
        value: messageList,
        loaded: true
      };
    },
    [SEND] (state, { newMessage }) {
      state.send.value.push(newMessage);
    },
  }
};
