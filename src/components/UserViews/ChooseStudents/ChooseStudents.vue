<style scoped lang="scss" src="./ChooseStudents.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">我的学生：<span>（最多选取五位学生）</span></h2>
        <el-button class="studentList-btn" type="text" @click="dialog.studentList=true">我的学生列表<i class="el-icon-document el-icon--right"></i></el-button>
      </div>
      <div class="studentList-wrapper">
        <div class="status">
          <el-table class="myStudents-table myStudents-view--table" :data="myStudents" stripe border>
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
            <el-table-column width="140" label="操作" align="center">
              <template scope="scope">
                <el-button class="agree-btn" type="text" size="small" @click="addStudent(scope.$index, scope.row)">添加至学生列表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog class="studentList-dialog" title="学生列表" size="large" v-model="dialog.studentList">
      <el-table class="student-list myStudents-view--table" :data="studentsForm" stripe border>
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
        <el-table-column width="120" prop="name" label="学生姓名" align="center"></el-table-column>
        <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" @click="removeStudent(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="submitStudents-btn-wrapper">
        <el-button type="primary" @click="submitStudents">提交学生列表</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
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
    name: 'choose-students',
    data () {
      return {
        myStudents: [
          {
            name: '高琦',
            studentID: '41355025',
            gender: '男',
            class: '计1301',
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
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            choosedTopic: '毕业设计（论文）管理系统'
          },
        ],
        dialog: {
          studentList: false
        },
        studentsForm: []
      };
    },
    methods: {
      addStudent (index, row) {
        if (this.studentsForm.length === 5) {
          Message.error('已经达到最大指导学生数（5个），请在我的学生列表查看');
          return;
        } else if (this.studentsForm.indexOf(row) > -1) {
          Message.warning('已经添加过此学生，请在我的学生列表查看');
          return;
        }
        this.studentsForm.push(row);
        Message.success('添加成功');
      },
      removeStudent (index, row) {
        this.studentsForm.splice(this.studentsForm.indexOf(row), 1);
        Message.success('移除成功');
      },
      submitStudents () {
        const data = {
          data: this.studentsForm
        };
        console.log(data);
      }
    }
  };
</script>
