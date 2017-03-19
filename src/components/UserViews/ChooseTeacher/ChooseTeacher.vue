<style scoped lang="scss" src="./ChooseTeacher.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">选择导师：<span>（最多选取三位导师）</span></h2>
        <el-button class="volunteerList-btn" type="text" @click="dialog.volunteerList=true">我的志愿列表<i class="el-icon-document el-icon--right"></i></el-button>
      </div>
      <div class="teacherList-wrapper">
        <el-table class="teacher-list chooseTeacher-view--table" :data="teachersData" stripe border>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" label-width="100px">
                <el-form-item class="form-item" label="导师姓名：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item class="form-item" label="性别：">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item class="form-item" label="学历：">
                  <span>{{ props.row.education }}</span>
                </el-form-item>
                <el-form-item class="form-item" label="职位职称：">
                  <span>{{ props.row.position }}</span>
                </el-form-item>
                <el-form-item class="form-item" label="邮箱：">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item class="form-item" label="手机：">
                  <span>{{ props.row.mobile }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column width="120" prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column width="180" prop="academy" :filters="academyList" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
          <el-table-column prop="topicList" :formatter="formatterTopic" label="研究课题" align="center"></el-table-column>
          <el-table-column width="140" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="addVolunteer(scope.$index, scope.row)">添加至志愿列表</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog class="volunteerList-dialog" title="志愿列表" size="large" v-model="dialog.volunteerList">
      <el-table class="volunteer-list" :data="volunteersForm" stripe border>
        <el-table-column width="120" prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column width="180" prop="academy" label="学院" align="center"></el-table-column>
        <el-table-column prop="chooseTopic" label="选择的研究课题" align="center"></el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog class="chooseTopic-dialog" title="选择研究课题" size="tiny" v-model="dialog.chooseTopic" :close-on-click-modal=false>
      <el-form ref="chooseTopic-form" :model="chooseTopicForm">
        <el-form-item>
          <el-select v-model="chooseTopicForm.topic" placeholder="请选择研究课题" style="width: 100%">
            <el-option v-for="item in topicList" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitTopic">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import mixins from '@/mixins';
  import { Button, Table, TableColumn, Form, FormItem, Select, Option, Input, Message } from 'element-ui';

  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(Input);

  export default {
    name: 'choose-teacher',
    mixins: [mixins],
    data () {
      return {
        academyList: [
          {
            text: '经济与管理',
            value: '经济与管理'
          }, {
            text: '计算机与通信工程',
            value: '计算机与通信工程'
          },
        ],
        teachersData: [
          {
            name: '王昭顺',
            gender: '男',
            academy: '计算机与通信工程',
            education: '博士',
            position: '教授（博导）',
            email: 'zhswang@sohu.com',
            mobile: '13520555528',
            topicList: ['毕业设计（论文）管理系', '毕业设计（论文）管理系统']
          }, {
            name: '王昭顺',
            gender: '男',
            academy: '经济与管理',
            education: '博士',
            position: '教授（博导）',
            email: 'zhswang@sohu.com',
            mobile: '13520555528',
            topicList: ['毕业设计（论文）管理系', '毕业设计（论文）统', '毕业设计（论文）管理系统']
          }
        ],
        dialog: {
          chooseTopic: false,
          volunteerList: false
        },
        chooseTopicForm: {
          topic: '',
          currentData: {}
        },
        rules: {
          chooseTopic: {
            topic: [
              { required: true, message: '请选择', trigger: 'blur' }
            ]
          }
        },
        topicList: [],
        volunteersForm: [],
      };
    },
    methods: {
      formatterTopic (row) {
        return row.topicList.join('；');
      },
      filterAcademy (value, row) {
        return row.academy === value;
      },
      submitTopic () {
        if (this.chooseTopicForm.topic === '') {
          Message.error('请选择研究课题');
          return;
        }
        this.chooseTopicForm.currentData.chooseTopic = this.chooseTopicForm.topic;
        this.volunteersForm.push(this.chooseTopicForm.currentData);
        Message.success('已经成功添加至志愿列表，请在我的志愿列表查看');
        this.resetForm('chooseTopicForm');
        this.dialog.chooseTopic = false;
      },
      addVolunteer (index, row) {
        if (this.volunteersForm.length === 3) {
          Message.error('已经达到最大志愿数（3个），请在我的志愿列表查看');
          return;
        } else if (this.volunteersForm.indexOf(row) > -1) {
          Message.warning('已经添加过此志愿老师，请在我的志愿列表查看');
          return;
        }
        this.topicList = row.topicList;
        this.dialog.chooseTopic = true;
        this.chooseTopicForm.currentData = row;
      }
    }
  };
</script>
