<style scoped lang="scss" src="./MyTeacher.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">我的导师：</h2>
      <div class="myTeacher-wrapper">
        <template v-if="status === 0">
          <div class="status">
            <h5 class="notice">还没有选择导师，点击右下角的“开始选择导师”来开始：）</h5>
            <router-link to="choose-teacher" class="choose-btn">开始选择导师</router-link>
          </div>
        </template>
        <template v-else-if="status === 1">
          <div class="status">
            <h5 class="notice">已提交导师志愿名单，请耐心等待导师选择确认：）</h5>
            <el-table class="myVolunteer-table myTeacher-view--table" :data="choosedTeachers" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学院：">
                      <span>{{ academyList[props.row.academyID - 1].value }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                      <span>{{ props.row.education }}</span>
                    </el-form-item>
                    <el-form-item label="职位职称：">
                      <span>{{ props.row.position }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column width="140" prop="order" label="志愿次序" align="center"></el-table-column>
              <el-table-column width="140" prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
              <el-table-column width="100" prop="status" label="状态" align="center">
                <template scope="scope">
                  <el-tag :type="scope.row.status === '进行中' ? 'success' : scope.row.status === '待进行' ? 'warning' : 'danger'">{{scope.row.status}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-else-if="status === 2">
          <div class="status">
            <el-table class="myTeacher-table myTeacher-view--table" :data="confirmedTeacher" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学院：">
                      <span>{{ academyList[props.row.academyID - 1].value }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                      <span>{{ props.row.education }}</span>
                    </el-form-item>
                    <el-form-item label="职位职称：">
                      <span>{{ props.row.position }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column width="140" prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column prop="topic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    username: 'my-teacher',
    mixins: [mixins],
    data () {
      return {
        dialog: {
          volunteer: false
        }
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      academyList: ({ global }) => global.academy.value,
      status: ({ volunteer }) => volunteer.studentStatus.value, // 0:未选择导师，1:等待导师回复中，2:已选择完成
      choosedTeachers: ({ volunteer }) => volunteer.choosedTeachers.value,
      confirmedTeacher: ({ volunteer }) => volunteer.confirmedTeacher.value,
    }),
    methods: {
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.global.academy.loaded) loads.push(store.dispatch('global/LOAD_ACADEMY'));
      if (!store.state.volunteer.studentStatus.loaded) {
        store.dispatch('volunteer/LOAD_STUDENT_STATUS')
        .then(() => {
          if (store.state.volunteer.studentStatus.value === 1 && !store.state.volunteer.choosedTeachers.loaded) {
            loads.push(store.dispatch('volunteer/LOAD_CHOOSED_TEACHERS'));
          } else if (store.state.volunteer.studentStatus.value === 2 && !store.state.volunteer.confirmedTeacher.loaded) {
            loads.push(store.dispatch('volunteer/LOAD_CONFIRMED_TEACHER'));
          }
          if (loads.length > 0) {
            return Promise.all(loads)
              .then(() => next())
              .catch(() => next(false));
          }
          return next();
        })
        .catch(() => next(false));
      }
      if (store.state.volunteer.studentStatus.value === 1 && !store.state.volunteer.choosedTeachers.loaded) {
        loads.push(store.dispatch('volunteer/LOAD_CHOOSED_TEACHERS'));
      } else if (store.state.volunteer.studentStatus.value === 2 && !store.state.volunteer.confirmedTeacher.loaded) {
        loads.push(store.dispatch('volunteer/LOAD_CONFIRMED_TEACHER'));
      }
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
