<style scoped lang="scss" src="./ChooseStudents.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">选择学生：<span>（最多选取五位学生）</span></h2>
        <el-button class="studentList-btn" type="text" @click="dialog.studentList=true">待确认学生列表<i class="el-icon-document el-icon--right"></i></el-button>
      </div>
      <div class="studentList-wrapper">
        <div class="status">
          <el-table class="student-list chooseStudent-view--table" :data="studentOptions" border>
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" label-width="100px">
                  <el-form-item label="学号：">
                    <span>{{ props.row._id }}</span>
                  </el-form-item>
                  <el-form-item label="性别：">
                    <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
                  </el-form-item>
                  <el-form-item label="专业：">
                    <span>{{ props.row.major }}</span>
                  </el-form-item>
                  <el-form-item label="学院：">
                    <span>{{ academyList[props.row.academyID - 1].value }}</span>
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
            <el-table-column width="120" prop="order" label="志愿次序" align="center" :filters="orderValues" :filter-method="filterOrder"></el-table-column>
            <el-table-column width="120" prop="username" label="学生姓名" align="center"></el-table-column>
            <el-table-column width="120" prop="_class" label="班级" align="center"></el-table-column>
            <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
            <el-table-column width="180" prop="status" label="状态" align="center" :filters="statusValues" :filter-method="filterStatus">
              <template scope="scope">
                <el-tag :type="scope.row.status === '已确认选择为您的学生' ? 'primary' : scope.row.status === '可以选择成为您的学生' ? 'success' : scope.row.status === '已拒绝' ? 'danger' : 'warning'">{{scope.row.status}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="120" label="操作" align="center">
              <template scope="scope">
                <template v-if="scope.row.status === '可以选择成为您的学生'">
                  <el-button type="text" size="small" @click="addStudent(scope.$index, scope.row)">添加</el-button>
                  <el-button class="refuse-btn" type="text" size="small" @click="submitRefuse(scope.$index, scope.row)">拒绝</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog class="studentList-dialog" title="学生列表" size="large" v-model="dialog.studentList">
      <el-table class="student-list myStudents-view--table" :data="choosedForm" border>
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" label-width="100px">
              <el-form-item label="学号：">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
              </el-form-item>
              <el-form-item label="班级：">
                <span>{{ props.row._class }}</span>
              </el-form-item>
              <el-form-item label="专业：">
                <span>{{ props.row.major }}</span>
              </el-form-item>
              <el-form-item label="学院：">
                <span>{{ academyList[props.row.academyID - 1].value }}</span>
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
        <el-table-column width="120" prop="username" label="学生姓名" align="center"></el-table-column>
        <el-table-column width="120" prop="order" label="志愿次序" align="center"></el-table-column>
        <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="removeStudent(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="submitStudents-btn-wrapper">
        <el-button v-if="choosedForm.length > 0" type="primary" @click="submitStudents">提交学生列表</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message, MessageBox } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'choose-students',
    mixins: [mixins],
    data () {
      return {
        orderValues: [
          {
            text: '1',
            value: 1
          },
          {
            text: '2',
            value: 2
          },
          {
            text: '3',
            value: 3
          }
        ],
        statusValues: [
          {
            text: '已确认选择为您的学生',
            value: '已确认选择为您的学生'
          },
          {
            text: '可以选择成为您的学生',
            value: '可以选择成为您的学生'
          },
          {
            text: '正在被其他志愿老师选择',
            value: '正在被其他志愿老师选择'
          },
          {
            text: '已被其他志愿老师选择',
            value: '已被其他志愿老师选择'
          }
        ],
        dialog: {
          studentList: false
        },
        choosedForm: [],
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      systemStatus: ({ system }) => system.status.value,
      academyList: ({ global }) => global.academy.value,
      studentOptions: ({ volunteer }) => volunteer.studentOptions.value,
      confirmedStudents () {
        return this.studentOptions.filter(item => item.status === '已确认选择为您的学生');
      }
    }),
    methods: {
      filterOrder (value, row) {
        return row.order === value;
      },
      filterStatus (value, row) {
        if (value !== '已确认选择为您的学生' || value !== '可以选择成为您的学生') {
          if (value === '正在被其他志愿老师选择') {
            return (row.status === '第一志愿老师正在选择') || (row.status === '第二志愿老师正在选择') || (row.status === '第三志愿老师正在选择');
          } else if (value === '已被其他志愿老师选择') {
            return (row.status === '已被第一志愿老师选择') || (row.status === '已被第二志愿老师选择') || (row.status === '已被第三志愿老师选择');
          }
        }
        return row.status === value;
      },
      addStudent (index, row) {
        if (this.choosedForm.length + this.confirmedStudents.length === 5) {
          Message.closeAll();
          Message.error('已经达到最大指导学生数（5个），无法添加');
          return;
        } else if (this.choosedForm.indexOf(row) > -1) {
          Message.closeAll();
          Message.warning('已经添加过此学生，请在我的学生列表查看');
          return;
        }
        this.choosedForm.push(row);
        Message.closeAll();
        Message.success('添加成功');
      },
      removeStudent (index, row) {
        this.choosedForm.splice(this.choosedForm.indexOf(row), 1);
        Message.closeAll();
        Message.success('移除成功');
      },
      submitStudents () {
        MessageBox.confirm('提交后无法再次拒绝该学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('volunteer/CHOOSE_STUDENTS', {
            ids: this.choosedForm.map(item => item._id),
            topics: this.choosedForm.map(item => item.choosedTopic),
          })
          .then(() => {
            Message.closeAll();
            Message.success('提交成功');
            this.dialog.studentList = false;
            this.choosedForm = [];
          })
          .catch(() => false);
        }).catch(() => {
          Message.closeAll();
          Message.success('已取消');
        });
      },
      submitRefuse (index, row) {
        MessageBox.confirm('拒绝后无法再次选择该学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('volunteer/REFUSE_STUDENT', {
            index,
            data: {
              student: row._id,
              order: row.order
            }
          })
          .then(() => {
            Message.closeAll();
            Message.success('拒绝成功');
            this.choosedForm.splice(this.choosedForm.indexOf(row), 1);
          })
          .catch(() => false);
        }).catch(() => {
          Message.closeAll();
          Message.success('已取消');
        });
      }
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.system.status.loaded) loads.push(store.dispatch('system/GET_STATUS'));
      if (!store.state.global.academy.loaded) loads.push(store.dispatch('global/LOAD_ACADEMY'));
      if (!store.state.system.status.loaded) loads.push(store.dispatch('system/GET_STATUS'));
      if (!store.state.volunteer.studentOptions.loaded) loads.push(store.dispatch('volunteer/LOAD_STUDENT_OPTIONS'));
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => {
            if (store.state.system.status.value !== 1) {
              Message.closeAll();
              Message.error('双向选择阶段已过期');
              return next('/user/my-students');
            }
            return next();
          })
          .catch(() => next(false));
      }
      if (store.state.system.status.value !== 1) {
        Message.closeAll();
        Message.error('双向选择阶段已过期');
        return next('/user/my-students');
      }
      return next();
    }
  };
</script>
