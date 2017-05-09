<style scoped lang="scss" src="./MyStudents.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">我的学生</h2>
        <template v-if="status !== 1">
          <el-button class="addTopic-btn" type="text" @click="dialog.topic=true">我的课题<i class="el-icon-fa-tasks el-icon--right"></i></el-button>
        </template>
        <template v-if="dialog.topic">
          <el-dialog title="我的课题" v-model="dialog.topic" :close-on-click-modal=false>
            <h5 v-show="topicList.topics.length > 0" class="form-title">已提供课题</h5>
            <el-form :model="topicList" ref="topicList" label-width="70px">
              <el-form-item v-for="(topic, index) in topicList.topics" :label="'课题' + (index + 1)" :key="index">
                <el-input :value="topic" readonly=true></el-input>
              </el-form-item>
            </el-form>
            <h5 class="form-title">新增加课题</h5>
            <el-form :model="topicForm" ref="topicForm" label-width="70px">
              <el-form-item
                v-for="(topic, index) in topicForm.topics"
                :label="'课题' + (index + 1)"
                :prop="'topics.' + index"
                :rules="{ required: true, message: '课题不能为空', trigger: 'blur' }">
                <el-row>
                  <el-col :span="20">
                    <el-input v-model="topicForm.topics[index]"></el-input>
                  </el-col>
                  <el-col :span="4" style="text-align: right">
                    <el-button @click.prevent="removeTopicItem(topic)">删除</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitTopicForm('topicForm')">提交</el-button>
                <el-button @click="addTopicItem" :loading="loading">新增课题</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </div>
      <div class="myTeacher-wrapper">
        <template v-if="status===0">
          <div class="status">
            <h5 class="notice">还没有选择学生，点击右下角的“开始选择学生”来开始：）</h5>
            <router-link to="choose-students" class="choose-btn">开始选择学生</router-link>
          </div>
        </template>
        <template v-else-if="status===1">
          <div class="status">
            <el-table class="myStudents-table myStudents-view--table" :data="myStudents" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学号：">
                      <span>{{ props.row.studentID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="班级：">
                      <span>{{ props.row.class }}</span>
                    </el-form-item>
                    <el-form-item label="专业：">
                      <span>{{ props.row.major }}</span>
                    </el-form-item>
                    <el-form-item label="学院：">
                      <span>{{ props.row.academy }}</span>
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
              <el-table-column width="140" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'my-students',
    mixins: [mixins],
    data () {
      return {
        status: 0, // 0:开始选择学生，1:已选择完成
        dialog: {
          topic: false
        },
        topicForm: {
          topics: ['']
        },
        myStudents: [
          {
            name: '高琦',
            studentID: '41355025',
            gender: '男',
            class: '计1301',
            major: '计算机科学与技术',
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            choosedTopic: '毕业设计（论文）管理系统'
          },
          {
            name: '高琦',
            studentID: '41355025',
            gender: '男',
            class: '计1301',
            major: '计算机科学与技术',
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            choosedTopic: '毕业设计（论文）管理系统'
          },
        ],
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      topicList ({ topic }) {
        return {
          topics: topic.data.value
        };
      }
    }),
    methods: {
      addTopicItem () {
        this.topicForm.topics.push('');
      },
      removeTopicItem (item) {
        if (this.topicForm.topics.length === 1) return;
        const index = this.topicForm.topics.indexOf(item);
        if (index !== -1) {
          this.topicForm.topics.splice(index, 1);
        }
      },
      submitTopicForm () {
        this.$refs.topicForm.validate((valid) => {
          if (valid) {
            return store.dispatch('topic/ADD', this.topicForm)
              .then(() => {
                Message.success('添加课题成功');
                this.resetForm('topicForm');
              })
              .catch(() => false);
          }
          return this.showInvalidateMsg();
        });
      },
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.topic.data.loaded) {
        return store.dispatch('topic/LOAD')
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
