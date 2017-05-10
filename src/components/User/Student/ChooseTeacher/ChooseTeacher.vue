<style scoped lang="scss" src="./ChooseTeacher.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">选择导师：<span>（请选取三位导师）</span></h2>
        <el-button class="volunteerList-btn" type="text" @click="dialog.volunteerList=true">我的志愿列表<i class="el-icon-document el-icon--right"></i></el-button>
      </div>
      <div class="teacherList-wrapper">
        <el-table class="teacher-list chooseTeacher-view--table" :data="teacherOptions" border>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" label-width="100px">
                <el-form-item label="导师姓名：">
                  <span>{{ props.row.username }}</span>
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
          <el-table-column width="120" prop="username" label="姓名" align="center"></el-table-column>
          <el-table-column width="180" prop="academy" :formatter="formatterAcademy" :filters="academyValues" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
          <el-table-column prop="topics" :formatter="formatterTopic" label="提供的研究课题" align="center"></el-table-column>
          <el-table-column width="140" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="addVolunteer(scope.$index, scope.row)">添加至志愿列表</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog class="volunteerList-dialog" title="志愿列表" size="large" v-model="dialog.volunteerList">
      <el-table class="volunteer-list chooseTeacher-view--table" :data="volunteersForm" border>
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" label-width="100px">
              <el-form-item label="学院：">
                <span>{{ props.row.academy }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.gender }}</span>
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
        <el-table-column width="120" prop="order" label="志愿次序" align="center"></el-table-column>
        <el-table-column width="120" prop="username" label="导师姓名" align="center"></el-table-column>
        <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="removeVolunteer(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="submitTopic-btn-wrapper">
        <el-button v-if="volunteersForm.length === 3" type="primary" @click="submitTopic" :loading="loading">提交志愿</el-button>
      </div>
    </el-dialog>
    <el-dialog class="chooseTopic-dialog" title="选择研究课题" size="tiny" v-model="dialog.chooseTopic" :close-on-click-modal=false>
      <el-form ref="chooseTopicForm" :model="chooseTopicForm">
        <el-form-item>
          <el-select v-model="chooseTopicForm.choosedTopic" placeholder="请选择研究课题" style="width: 100%">
            <el-option v-for="(item,index) in candidateTopics" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="chooseTopicForm.order" placeholder="请选择此志愿次序" style="width: 100%">
            <el-option v-for="item in orderOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="addTopic">添加志愿</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message, MessageBox } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'choose-teacher',
    mixins: [mixins],
    data () {
      return {
        dialog: {
          chooseTopic: false,
          volunteerList: false
        },
        chooseTopicForm: {
          currentData: {},
          choosedTopic: '',
          order: ''
        },
        candidateTopics: [],
        orderOptions: [
          {
            label: '第一志愿',
            value: 1
          },
          {
            label: '第二志愿',
            value: 2
          },
          {
            label: '第三志愿',
            value: 3
          },
        ],
        volunteersForm: [],
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      systemStatus: ({ system }) => system.status.value,
      academyList: ({ global }) => global.academy.value,
      teacherOptions: ({ volunteer }) => volunteer.teacherOptions.value,
      academyValues () {
        return this.academyList.map(item => ({
          text: item.value,
          value: item._id
        }));
      }
    }),
    methods: {
      formatterAcademy (row) {
        return this.academyList[row.academyID - 1].value;
      },
      formatterTopic (row) {
        return row.topics.length > 0 ? row.topics.join('；') : '暂未提供课题';
      },
      filterAcademy (value, row) {
        return row.academyID === value;
      },
      addTopic () {
        if (this.chooseTopicForm.choosedTopic === '' || this.chooseTopicForm.order === '') {
          this.showInvalidateMsg();
          return;
        }
        this.chooseTopicForm.currentData.choosedTopic = this.chooseTopicForm.choosedTopic;
        this.chooseTopicForm.currentData.order = this.chooseTopicForm.order;
        this.volunteersForm.push(this.chooseTopicForm.currentData);
        this.volunteersForm.sort((a, b) => a.order - b.order);
        for (let i = 0; i < this.orderOptions.length; i += 1) {
          if (this.orderOptions[i].value === this.chooseTopicForm.order) {
            this.orderOptions.splice(i, 1);
            break;
          }
        }
        Message.closeAll();
        Message.success('已经成功添加至志愿列表，请在我的志愿列表查看');
        this.resetForm('chooseTopicForm');
        this.dialog.chooseTopic = false;
      },
      addVolunteer (index, row) {
        if (row.topics.length === 0) {
          Message.closeAll();
          Message.error('该老师暂未提供课题，无法添加');
          return;
        } else if (this.volunteersForm.length === 3) {
          Message.closeAll();
          Message.error('已经达到最大志愿数（3个），请在我的志愿列表查看');
          return;
        } else if (this.volunteersForm.indexOf(row) > -1) {
          Message.closeAll();
          Message.warning('已经添加过此志愿老师，请在我的志愿列表查看');
          return;
        }
        this.candidateTopics = row.topics;
        this.resetForm('chooseTopicForm');
        this.dialog.chooseTopic = true;
        this.chooseTopicForm.currentData = row;
      },
      removeVolunteer (index, row) {
        let optionsLabel;
        switch (row.order) {
          case 1:
            optionsLabel = '第一志愿';
            break;
          case 2:
            optionsLabel = '第二志愿';
            break;
          case 3:
            optionsLabel = '第三志愿';
            break;
          default:
        }
        this.orderOptions.push({
          label: optionsLabel,
          value: row.order
        });
        this.orderOptions.sort((a, b) => a.value - b.value);
        this.volunteersForm.splice(this.volunteersForm.indexOf(row), 1);
        Message.closeAll();
        Message.success('移除成功');
      },
      submitTopic () {
        MessageBox.confirm('只能提交一次志愿, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('volunteer/CHOOSE_TEACHERS', {
            firstTeacherID: this.volunteersForm[0]._id,
            firstTopic: this.volunteersForm[0].choosedTopic,
            secondTeacherID: this.volunteersForm[1]._id,
            secondTopic: this.volunteersForm[1].choosedTopic,
            thirdTeacherID: this.volunteersForm[2]._id,
            thirdTopic: this.volunteersForm[2].choosedTopic,
          })
          .then(() => {
            Message.closeAll();
            Message.success('提交志愿成功');
            this.$router.replace('/user/my-teacher');
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
      if (!store.state.volunteer.studentStatus.loaded) loads.push(store.dispatch('volunteer/LOAD_STUDENT_STATUS'));
      if (!store.state.volunteer.teacherOptions.loaded) loads.push(store.dispatch('volunteer/LOAD_TEACHER_OPTIONS'));
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => {
            if (store.state.volunteer.studentStatus.value !== 0) {
              Message.closeAll();
              Message.error('已提交过志愿名单，无法再次选择');
              return next('/user/my-teacher');
            } else if (store.state.system.status.value !== 1) {
              Message.closeAll();
              Message.error('双向选择阶段已过期');
              return next('/user/my-teacher');
            }
            return next();
          })
          .catch(() => next(false));
      }
      if (store.state.volunteer.studentStatus.value !== 0) {
        Message.closeAll();
        Message.error('已提交过志愿名单，无法再次选择');
        return next('/user/my-teacher');
      } else if (store.state.system.status.value !== 1) {
        Message.closeAll();
        Message.error('双向选择阶段已过期');
        return next('/user/my-teacher');
      }
      return next();
    }
  };
</script>
