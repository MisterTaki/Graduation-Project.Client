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
                <el-form-item label="导师姓名：">
                  <span>{{ props.row.name }}</span>
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
          <el-table-column width="120" prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column width="180" prop="academy" :filters="academyList" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
          <el-table-column prop="topicList" :formatter="formatterTopic" label="提供的研究课题" align="center"></el-table-column>
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
        <el-table-column width="120" prop="order" label="志愿次序" align="center"></el-table-column>
        <el-table-column width="120" prop="name" label="导师姓名" align="center"></el-table-column>
        <el-table-column width="180" prop="academy" label="导师学院" align="center"></el-table-column>
        <el-table-column prop="chooseTopic" label="选择的研究课题" align="center"></el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="removeVolunteer(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="submitTopic-btn-wrapper">
        <el-button v-if="volunteersForm.length !== 0" type="primary" @click="submitTopic">提交志愿</el-button>
      </div>
    </el-dialog>
    <el-dialog class="chooseTopic-dialog" title="选择研究课题" size="tiny" v-model="dialog.chooseTopic" :close-on-click-modal=false>
      <el-form ref="chooseTopic-form" :model="chooseTopicForm">
        <el-form-item>
          <el-select v-model="chooseTopicForm.topic" placeholder="请选择研究课题" style="width: 100%">
            <el-option v-for="item in candidateTopics" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="chooseTopicForm.order" placeholder="请选择此志愿为第几志愿" style="width: 100%">
            <el-option v-for="item in candidateOrders" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="addTopic">添加志愿</el-button>
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
          currentData: {},
          order: ''
        },
        candidateTopics: [],
        candidateOrders: ['第一志愿', '第二志愿', '第三志愿'],
        // candidateOrders: [
        //   {
        //     label: '第一志愿',
        //     value: 1
        //   },
        //   {
        //     label: '第二志愿',
        //     value: 2
        //   },
        //   {
        //     label: '第三志愿',
        //     value: 3
        //   },
        // ],
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
      addTopic () {
        if (this.chooseTopicForm.topic === '') {
          Message.error('请选择研究课题');
          return;
        } else if (this.chooseTopicForm.order === '') {
          Message.error('请选择志愿次序');
          return;
        }
        this.chooseTopicForm.currentData.chooseTopic = this.chooseTopicForm.topic;
        this.chooseTopicForm.currentData.order = this.chooseTopicForm.order;
        this.volunteersForm.push(this.chooseTopicForm.currentData);
        this.candidateOrders.splice(this.candidateOrders.indexOf(this.chooseTopicForm.order), 1);
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
        this.candidateTopics = row.topicList;
        this.dialog.chooseTopic = true;
        this.chooseTopicForm.currentData = row;
      },
      removeVolunteer (index, row) {
        this.candidateOrders.push(row.order);
        this.volunteersForm.splice(this.volunteersForm.indexOf(row), 1);
        Message.success('移除成功');
      },
      submitTopic () {
        const data = {
          data: this.volunteersForm
        };
        console.log(data);
      }
    }
  };
</script>
