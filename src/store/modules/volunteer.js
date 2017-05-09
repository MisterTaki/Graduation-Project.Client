import { client } from '@/helpers';
import { volunteer } from '@/api';

const LOAD_TEACHER_OPTIONS = 'volunteer/LOAD_TEACHER_OPTIONS';
const LOAD_STUDENT_OPTIONS = 'volunteer/LOAD_STUDENT_OPTIONS';
const LOAD_STUDENT_STATUS = 'volunteer/LOAD_STUDENT_STATUS';
const LOAD_CHOOSED_TEACHERS = 'volunteer/LOAD_CHOOSED_TEACHERS';
const CHOOSE = 'volunteer/CHOOSE';

export default {
  state: {
    studentOptions: {
      value: [],
      loaded: false
    },
    teacherOptions: {
      value: [],
      loaded: false
    },
    studentStatus: {
      value: 0,
      loaded: false
    },
    teacherStatus: {
      value: 0,
      loaded: false
    },
    choosedTeachers: {
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
    },
    async [LOAD_STUDENT_OPTIONS] ({ commit }) {
      commit(LOAD_STUDENT_OPTIONS, await client.get(volunteer.load, {
        params: {
          type: 'option'
        }
      }));
    },
    async [LOAD_STUDENT_STATUS] ({ commit }) {
      commit(LOAD_STUDENT_STATUS, await client.get(volunteer.load, {
        params: {
          type: 'status'
        }
      }));
    },
    async [LOAD_CHOOSED_TEACHERS] ({ commit }) {
      commit(LOAD_CHOOSED_TEACHERS, await client.get(volunteer.load, {
        params: {
          type: 'choosed'
        }
      }));
    },
    async [CHOOSE] ({ commit }, data) {
      await client.post(volunteer.choose, { data });
      commit(CHOOSE);
    }
  },
  mutations: {
    [LOAD_TEACHER_OPTIONS] (state, { teachers }) {
      state.teacherOptions = {
        value: teachers,
        loaded: true
      };
    },
    [LOAD_STUDENT_OPTIONS] (state, { students }) {
      state.studentOptions = {
        value: students,
        loaded: true
      };
    },
    [LOAD_STUDENT_STATUS] (state, { status }) {
      state.studentStatus = {
        value: status,
        loaded: true
      };
    },
    [LOAD_CHOOSED_TEACHERS] (state, { choosedTeachers }) {
      state.choosedTeachers = {
        value: choosedTeachers,
        loaded: true
      };
    },
    [CHOOSE] (state) {
      state.studentStatus.value = 1;
    },
  }
};
