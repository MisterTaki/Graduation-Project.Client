<style scoped lang="scss" src="./AccountManage.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="tabs-wrapper">
        <el-tabs class="tabs accountManage-view--tabs" :value="activeTab" type="card">
          <el-tab-pane label="学生账号" name="student">
            <el-table class="studentAccount-list accountManage-view--table" :data="studentsAccount" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="专业：">
                      <span>{{ props.row.major }}</span>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                      <span>{{ props.row.ID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                    <el-form-item label="选择的导师：">
                      <span>{{ props.row.choosedTeacher }}</span>
                    </el-form-item>
                    <el-form-item label="研究课题：">
                      <span>{{ props.row.choosedTopic }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column width="120" prop="studentID" label="学号" align="center"></el-table-column>
              <el-table-column width="80" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column width="100" prop="class" label="班级" align="center"></el-table-column>
              <el-table-column prop="academy" :filters="academyList" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="edit-btn" type="text" size="small" @click="editStudentAccount(scope.$index, scope.row)">编辑</el-button>
                  <el-button class="remove-btn" type="text" size="small" @click="removeStudentAccount(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="导师账号" name="teacher">
            <el-table class="teachersAccount-list accountManage-view--table" :data="teachersAccount" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="身份证号：">
                      <span>{{ props.row.ID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                    <el-form-item label="提供课题：">
                      <span>{{ props.row.topicList.join('；') }}</span>
                    </el-form-item>
                    <el-form-item label="指导学生：">
                      <span>{{ props.row.choosedStudents.join('；') }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column width="120" prop="teacherID" label="工号" align="center"></el-table-column>
              <el-table-column width="80" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="academy" :filters="academyList" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="edit-btn" type="text" size="small" @click="editTeacherAccount(scope.$index, scope.row)">编辑</el-button>
                  <el-button class="remove-btn" type="text" size="small" @click="removeTeacherAccount(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="管理员账号" name="admin">
            <el-table class="adminsAccount-list accountManage-view--table" :data="adminsAccount" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="账号：">
                      <span>{{ props.row.adminID }}</span>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                      <span>{{ props.row.ID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
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
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column width="80" prop="level" label="级别" align="center"></el-table-column>
              <el-table-column width="80" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="academy" :filters="academyList" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="edit-btn" type="text" size="small" @click="editTeacherAccount(scope.$index, scope.row)">编辑</el-button>
                  <el-button class="remove-btn" type="text" size="small" @click="removeTeacherAccount(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="btn-group">
          <el-input class="search-input accountManage-view--input" placeholder="按学号、工号搜索账号信息" type="text" icon="search" v-model="searchInput" @keyup.enter.native="searchSubmit" :on-icon-click="searchSubmit">
          </el-input>
          <el-button class="addAccount-btn" type="text" @click="dialog.addAccountForm=true">添加账号<i class="el-icon-plus el-icon--right"></i></el-button>
        </div>
      </div>
    </div>
    <el-dialog class="addAccountForm-dialog" title="添加账号" size="small" v-model="dialog.addAccountForm" @open="resetForm('addAccountForm')">
      <h3 class="tip">请填写账号信息：</h3>
      <el-form ref="addStudentAccountForm" class="form addStudentAccount-form" :model="addAccountForm.student" :rules="rules.addStudentAccount">
        <el-form-item class="input-wrapper" prop="name">
          <el-input type="text" placeholder="姓名" v-model="addAccountForm.student.name"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="gender">
          <el-input type="text" placeholder="性别" v-model="addAccountForm.student.gender"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="studentID">
          <el-input type="text" placeholder="学号" v-model="addAccountForm.student.studentID"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="class">
          <el-input type="text" placeholder="班级" v-model="addAccountForm.student.class"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="academy">
          <el-input type="text" placeholder="学院" v-model="addAccountForm.student.academy"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="major">
          <el-input type="text" placeholder="专业" v-model="addAccountForm.student.major"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="ID">
          <el-input type="text" placeholder="身份证号" v-model="addAccountForm.student.ID"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="mobile">
          <el-input type="text" placeholder="手机" v-model="addAccountForm.student.mobile"></el-input>
        </el-form-item>
        <el-form-item class="input-wrapper" prop="email">
          <el-input type="text" placeholder="邮箱" v-model="addAccountForm.student.email"></el-input>
        </el-form-item>
        <div class="form-btn-group">
          <el-button type="primary" @click="submitNotice">立即发布</el-button>
          <el-button @click="dialog.editNotice=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import mixins from '@/mixins';

  export default {
    name: 'account-manage',
    mixins: [mixins],
    data () {
      return {
        activeTab: 'student',
        academyList: [
          {
            text: '经济与管理',
            value: '经济与管理'
          }, {
            text: '计算机与通信工程',
            value: '计算机与通信工程'
          },
        ],
        studentsAccount: [
          {
            name: '高琦',
            studentID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            class: '计1301',
            major: '计算机科学与技术',
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            choosedTeacher: '王昭顺',
            choosedTopic: '毕业设计（论文）管理系统'
          },
          {
            name: '高琦',
            studentID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            class: '计1301',
            major: '计算机科学与技术',
            academy: '经济与管理',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            choosedTeacher: '王昭顺',
            choosedTopic: '毕业设计（论文）管理系统'
          },
        ],
        teachersAccount: [
          {
            name: '王昭顺',
            teacherID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            academy: '计算机与通信工程',
            education: '博士',
            position: '教授（博导）',
            email: 'zhswang@sohu.com',
            mobile: '13520555528',
            choosedStudents: ['高琦', '周磊'],
            topicList: ['毕业设计（论文）管理系', '毕业设计（论文）管理系统']
          },
          {
            name: '王昭顺',
            teacherID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            academy: '经济与管理',
            education: '博士',
            position: '教授（博导）',
            email: 'zhswang@sohu.com',
            mobile: '13520555528',
            choosedStudents: ['高琦', '周磊'],
            topicList: ['毕业设计（论文）管理系', '毕业设计（论文）管理系统']
          },
        ],
        adminsAccount: [
          {
            name: '系统',
            adminID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            level: '普通',
            academy: '计算机与通信工程',
            email: 'zhswang@sohu.com',
            mobile: '13520555528'
          },
          {
            name: '系统',
            adminID: '41355025',
            ID: '610111199311294536',
            gender: '男',
            level: '超级',
            academy: '计算机与通信工程',
            email: 'zhswang@sohu.com',
            mobile: '13520555528'
          },
        ],
        searchInput: '',
        dialog: {
          addAccountForm: false,
          searchResult: false
        },
        addAccountForm: {
          student: {
            name: '',
            studentID: '',
            ID: '',
            gender: '',
            class: '',
            academy: '',
            email: '',
            mobile: ''
          },
          teacher: {
            name: '',
            teacherID: '',
            ID: '',
            gender: '',
            academy: '',
            education: '',
            position: '',
            email: '',
            mobile: ''
          },
          admin: {
            name: '',
            adminID: '',
            ID: '',
            gender: '',
            level: '',
            academy: '',
            email: '',
            mobile: ''
          }
        },
        rules: {
          addStudentAccount: {
            name: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请输入性别', trigger: 'blur' }
            ],
            studentID: [
              { required: true, message: '请输入学号', trigger: 'blur' }
            ],
            class: [
              { required: true, message: '请输入班级', trigger: 'blur' }
            ],
            academy: [
              { required: true, message: '请输入学院', trigger: 'blur' }
            ],
            major: [
              { required: true, message: '请输入专业', trigger: 'blur' }
            ],
            ID: [
              { required: true, message: '请输入身份证号', trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: '请输入手机', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' }
            ],
          },
        },
      };
    },
    methods: {
      filterAcademy (value, row) {
        return row.academy === value;
      },
      searchSubmit () {
        Message.success('搜索成功');
      }
    }
  };
</script>
