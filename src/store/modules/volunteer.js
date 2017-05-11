import { client } from '@/helpers';
import { volunteer } from '@/api';

const LOAD_TEACHER_OPTIONS = 'volunteer/LOAD_TEACHER_OPTIONS';
const LOAD_STUDENT_OPTIONS = 'volunteer/LOAD_STUDENT_OPTIONS';
const LOAD_STUDENT_STATUS = 'volunteer/LOAD_STUDENT_STATUS';
const LOAD_CHOOSED_TEACHERS = 'volunteer/LOAD_CHOOSED_TEACHERS';
const LOAD_CONFIRMED_STUDENTS = 'volunteer/LOAD_CONFIRMED_STUDENTS';
const LOAD_CONFIRMED_TEACHER = 'volunteer/LOAD_CONFIRMED_TEACHER';
const CHOOSE_TEACHERS = 'volunteer/CHOOSE_TEACHERS';
const CHOOSE_STUDENTS = 'volunteer/CHOOSE_STUDENTS';
const REFUSE_STUDENT = 'volunteer/REFUSE_STUDENT';

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
    },
    confirmedStudents: {
      value: [],
      loaded: false
    },
    confirmedTeacher: {
      value: [],
      loaded: false
    },
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
    async [LOAD_CONFIRMED_STUDENTS] ({ commit }) {
      commit(LOAD_CONFIRMED_STUDENTS, await client.get(volunteer.load, {
        params: {
          type: 'confirmed'
        }
      }));
    },
    async [LOAD_CONFIRMED_TEACHER] ({ commit }) {
      commit(LOAD_CONFIRMED_TEACHER, await client.get(volunteer.load, {
        params: {
          type: 'confirmed'
        }
      }));
    },
    async [CHOOSE_TEACHERS] ({ commit }, data) {
      await client.post(volunteer.choose, { data });
      commit(CHOOSE_TEACHERS);
    },
    async [CHOOSE_STUDENTS] ({ commit }, data) {
      await client.post(volunteer.choose, { data });
      commit(CHOOSE_STUDENTS, { data });
    },
    async [REFUSE_STUDENT] ({ commit }, { data, index }) {
      await client.post(volunteer.refuse, { data });
      commit(REFUSE_STUDENT, { index });
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
    [LOAD_CONFIRMED_STUDENTS] (state, { confirmedStudents }) {
      state.confirmedStudents = {
        value: confirmedStudents,
        loaded: true
      };
    },
    [LOAD_CONFIRMED_TEACHER] (state, { confirmedTeacher }) {
      state.confirmedTeacher = {
        value: [confirmedTeacher],
        loaded: true
      };
    },
    [CHOOSE_TEACHERS] (state) {
      state.studentStatus.value = 1;
    },
    [CHOOSE_STUDENTS] (state, { data }) {
      const { ids } = data;
      state.studentOptions.value = state.studentOptions.value.map((item) => {
        if (ids.indexOf(item._id) > -1) {
          item.status = '已确认选择为您的学生';
        }
        return item;
      });
    },
    [REFUSE_STUDENT] (state, { index }) {
      state.studentOptions.value[index].status = '已拒绝';
    },
  }
};
