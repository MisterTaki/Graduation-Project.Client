import { client } from '@/helpers';
import { message } from '@/api';

const SEND = 'message/SEND';
const LOAD_LATEST = 'message/LOAD_LATEST';
const LOAD_RECEIVE = 'message/LOAD_RECEIVE';
const LOAD_SEND = 'message/LOAD_SEND';
const LOAD_DELETED = 'message/LOAD_DELETED';
const MARK = 'message/MARK';
const DELETE = 'message/DELETE';

export default {
  state: {
    latest: {
      value: [],
      loaded: false
    },
    receive: {
      value: [],
      loaded: false
    },
    send: {
      value: [],
      loaded: false
    },
    deleted: {
      value: [],
      loaded: false
    },
    isMarked: false
  },
  actions: {
    async [LOAD_LATEST] ({ commit }) {
      commit(LOAD_LATEST, await client.get(message.load, {
        params: {
          type: 'latest'
        }
      }));
    },
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
    async [LOAD_DELETED] ({ commit }) {
      commit(LOAD_DELETED, await client.get(message.load, {
        params: {
          type: 'deleted'
        }
      }));
    },
    async [SEND] ({ commit }, data) {
      commit(SEND, await client.post(message.send, { data }));
    },
    async [DELETE] ({ commit }, { data, index }) {
      await client.delete(message.delete, { data });
      commit(DELETE, { index });
    },
    async [MARK] ({ commit }) {
      commit(MARK, await client.post(message.mark));
    },
  },
  mutations: {
    [LOAD_LATEST] (state, { messageList }) {
      state.latest = {
        value: messageList,
        loaded: true
      };
    },
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
    [LOAD_DELETED] (state, { messageList }) {
      state.deleted = {
        value: messageList,
        loaded: true
      };
    },
    [SEND] (state, { newMessage }) {
      state.send.value.push(newMessage);
    },
    [DELETE] (state, { index }) {
      state.deleted.value.push(state.receive.value.splice(index, 1));
    },
    [MARK] (state) {
      state.latest.value = [];
      state.isMarked = true;
    }
  }
};
