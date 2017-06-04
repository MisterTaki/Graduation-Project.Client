import { client } from '@/helpers';
import { account } from '@/api';

const CREATE = 'account/CREATE';
const DELETE = 'account/DELETE';
const AGREE = 'account/AGREE';
const REFUSE = 'account/REFUSE';
const LOAD_STUDENTS = 'account/LOAD_STUDENTS';
const LOAD_TEACHERS = 'account/LOAD_TEACHERS';
const LOAD_ADMINS = 'account/LOAD_ADMINS';
const LOAD_APPLYS = 'account/LOAD_APPLYS';
const MODIFY_STUDENT = 'account/MODIFY_STUDENT';
const MODIFY_TEACHER = 'account/MODIFY_TEACHER';
const MODIFY_ADMIN = 'account/MODIFY_ADMIN';
const HAHA = 'account/HAHA';

export default {
  state: {
    students: {
      value: '',
      loaded: false
    },
    teachers: {
      value: '',
      loaded: false
    },
    admins: {
      value: '',
      loaded: false
    },
    applys: {
      value: '',
      loaded: false
    }
  },
  actions: {
    async [CREATE] ({ commit }, data) {
      await client.post(account.create, { data });
      commit(CREATE, data);
    },
    async [DELETE] ({ commit }, { data, index }) {
      await client.delete(account.delete, { data });
      commit(DELETE, { index, identity: data.identity });
    },
    async [AGREE] ({ commit }, { data, index }) {
      await client.post(account.agree, { data });
      commit(AGREE, { index, data });
    },
    async [REFUSE] ({ commit }, { data, index }) {
      await client.post(account.refuse, { data });
      commit(REFUSE, { index, identity: data.identity });
    },
    async [LOAD_APPLYS] ({ commit }) {
      commit(LOAD_APPLYS, await client.get(account.load, {
        params: {
          type: 'apply'
        }
      }));
    },
    async [LOAD_STUDENTS] ({ commit }) {
      commit(LOAD_STUDENTS, await client.get(account.load, {
        params: {
          type: 'student'
        }
      }));
    },
    async [LOAD_TEACHERS] ({ commit }) {
      commit(LOAD_TEACHERS, await client.get(account.load, {
        params: {
          type: 'teacher'
        }
      }));
    },
    async [LOAD_ADMINS] ({ commit }) {
      commit(LOAD_ADMINS, await client.get(account.load, {
        params: {
          type: 'admin'
        }
      }));
    },
    async [MODIFY_STUDENT] ({ commit }, data) {
      await client.post(account.modify, { data });
      commit(MODIFY_STUDENT, data);
    },
    async [MODIFY_TEACHER] ({ commit }, data) {
      await client.post(account.modify, { data });
      commit(MODIFY_TEACHER, data);
    },
    async [MODIFY_ADMIN] ({ commit }, data) {
      await client.post(account.modify, { data });
      commit(MODIFY_ADMIN, data);
    },
  },
  mutations: {
    [CREATE] (state, data) {
      const { identity } = data;
      state[`${identity}s`].value.push(data);
    },
    [DELETE] (state, { index, identity }) {
      state[`${identity}s`].value.splice(index, 1);
    },
    [AGREE] (state, { index, data }) {
      state.applys.value.splice(index, 1);
      state.students.value.push(data);
    },
    [REFUSE] (state, { index }) {
      state.applys.value.splice(index, 1);
    },
    [LOAD_APPLYS] (state, { accounts }) {
      state.applys = {
        value: accounts,
        loaded: true
      };
    },
    [LOAD_STUDENTS] (state, { accounts }) {
      state.students = {
        value: accounts,
        loaded: true
      };
    },
    [LOAD_TEACHERS] (state, { accounts }) {
      state.teachers = {
        value: accounts,
        loaded: true
      };
    },
    [LOAD_ADMINS] (state, { accounts }) {
      state.admins = {
        value: accounts,
        loaded: true
      };
    },
    [MODIFY_STUDENT] (state, data) {
      for (let i = 0; i < state.students.value.length; i += 1) {
        if (state.students.value[i]._id === data._id) {
          state.students.value.splice(i, 1, data);
          return;
        }
      }
    },
    [MODIFY_TEACHER] (state, data) {
      for (let i = 0; i < state.teachers.value.length; i += 1) {
        if (state.teachers.value[i]._id === data._id) {
          state.teachers.value.splice(i, 1, data);
          return;
        }
      }
    },
    [MODIFY_ADMIN] (state, data) {
      for (let i = 0; i < state.admins.value.length; i += 1) {
        if (state.admins.value[i]._id === data._id) {
          state.admins.value.splice(i, 1, data);
          return;
        }
      }
    },
    [HAHA] (state) {
      state.students.value = [
        {
          major: '计算机与通信工程学院',
          _id: '41355025',
          ID: '610111199311294536',
          _class: '计1301',
          academyID: '7',
          email: 'ustb_gaoqi@163.com',
          gender: 'm',
          mobile: '15652063671',
          teacher: 'T1005',
          topic: '测试课题1',
          username: '高琦'
        }
      ];
    },
  }
};
