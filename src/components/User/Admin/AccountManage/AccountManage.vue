<style scoped lang="scss" src="./AccountManage.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="tabs-wrapper">
        <el-tabs class="tabs accountManage-view--tabs" value="student" type="card">
          <el-tab-pane label="学生账号" name="student">
            <!-- <div class="search-wrapper">
              <el-input class="search-input accountManage-view--input" placeholder="按学号搜索账号信息" type="text" icon="search" v-model="searchInput" @keyup.enter.native="searchSubmit" :on-icon-click="searchSubmit">
              </el-input>
            </div> -->
            <el-table class="studentAccount-list accountManage-view--table" :data="studentAccounts" border>
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
                      <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                    <el-form-item label="导师：">
                      <span>{{ props.row.teacher ? props.row.teacher : '暂未有导师' }}</span>
                    </el-form-item>
                    <el-form-item label="研究课题：">
                      <span>{{ props.row.topic ? props.row.topic : '暂未有研究课题' }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column width="120" prop="_id" label="学号" align="center"></el-table-column>
              <el-table-column width="100" prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column width="100" prop="_class" label="班级" align="center"></el-table-column>
              <el-table-column prop="academy" :formatter="formatterAcademy" :filters="academyValues" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="modify-btn" type="text" size="small" @click="modifyAccount(scope.$index, scope.row, 'student')">编辑</el-button>
                  <el-button class="delete-btn" type="text" size="small" @click="submitDelete(scope.$index, scope.row, 'student')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="导师账号" name="teacher">
            <!-- <div class="search-wrapper">
              <el-input class="search-input accountManage-view--input" placeholder="按工号搜索账号信息" type="text" icon="search" v-model="searchInput" @keyup.enter.native="searchSubmit" :on-icon-click="searchSubmit">
              </el-input>
            </div> -->
            <el-table class="teachersAccount-list accountManage-view--table" :data="teacherAccounts" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="身份证号：">
                      <span>{{ props.row.ID }}</span>
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
                    <el-form-item label="提供课题：" style="width: 100%;">
                      <span>{{ props.row.topics.length > 0 ? props.row.topics.join('；') : '暂未提供课题' }}</span>
                    </el-form-item>
                    <el-form-item label="指导学生：" style="width: 100%;">
                      <span>{{ props.row.students.length > 0 ? props.row.students.join('；') : '暂未指导学生' }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column width="120" prop="_id" label="工号" align="center"></el-table-column>
              <el-table-column width="100" prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column prop="academy" :formatter="formatterAcademy" :filters="academyValues" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="modify-btn" type="text" size="small" @click="modifyAccount(scope.$index, scope.row, 'teacher')">编辑</el-button>
                  <el-button class="delete-btn" type="text" size="small" @click="submitDelete(scope.$index, scope.row, 'teacher')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="管理员账号" name="admin">
            <!-- <div class="search-wrapper">
              <el-input class="search-input accountManage-view--input" placeholder="按帐号搜索账号信息" type="text" icon="search" v-model="searchInput" @keyup.enter.native="searchSubmit" :on-icon-click="searchSubmit">
              </el-input>
            </div> -->
            <el-table class="adminsAccount-list accountManage-view--table" :data="adminAccounts" border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="账号：">
                      <span>{{ props.row._id }}</span>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                      <span>{{ props.row.ID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender === 'm' ? '男' : '女' }}</span>
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
              <el-table-column width="80" prop="level" label="级别" align="center" :formatter="formatterLevel"></el-table-column>
              <el-table-column width="180" prop="username" label="姓名" align="center"></el-table-column>
              <el-table-column prop="academy" :formatter="formatterAcademy" :filters="academyValues" :filter-method="filterAcademy" label="学院" align="center"></el-table-column>
              <el-table-column width="140" label="操作" align="center">
                <template scope="scope">
                  <el-button class="modify-btn" type="text" size="small" @click="modifyAccount(scope.$index, scope.row, 'admin')">编辑</el-button>
                  <el-button class="delete-btn" type="text" size="small" @click="submitDelete(scope.$index, scope.row, 'admin')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-dropdown class="createAccount-dropdown" trigger="click">
          <span class="createAccount-span">
            创建账号<i class="el-icon-plus el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="dropdown-item" @click.native="createAccount('student')">学生账号</el-dropdown-item>
            <el-dropdown-item class="dropdown-item" @click.native="createAccount('teacher')">导师账号</el-dropdown-item>
            <el-dropdown-item class="dropdown-item" @click.native="createAccount('admin')">管理员账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <template v-if="dialog.studentAccount">
      <el-dialog class="accountForm-dialog" title="学生账号" size="large" v-model="dialog.studentAccount" :close-on-click-modal=false>
        <h3 class="tip">账号信息：</h3>
        <el-form ref="studentAccountForm" class="createAccount-form" :model="studentAccountForm" :rules="rules.studentAccount" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="username" label="姓名">
                <el-input type="text" v-model="studentAccountForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="gender" label="性别">
                <el-select style="width: 100%;" v-model="studentAccountForm.gender" placeholder="请选择">
                  <el-option label="男" value="m"></el-option>
                  <el-option label="女" value="f"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="_id" label="学号">
                <el-input type="text" v-model="studentAccountForm._id" :readonly="dialog.status === 'modify'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="_class" label="班级">
                <el-input type="text" v-model="studentAccountForm._class"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="academyID" label="学院">
                <el-select style="width: 100%;" v-model="studentAccountForm.academyID" placeholder="请选择">
                  <el-option
                    v-for="item in academyOptions"
                    :label="item.value"
                    :key="item._id"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="major" label="专业">
                <el-input type="text" v-model="studentAccountForm.major"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="ID" label="身份证号">
                <el-input type="text" v-model="studentAccountForm.ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="mobile" label="手机">
                <el-input type="text" v-model="studentAccountForm.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="email" label="邮箱">
                <el-input type="text" v-model="studentAccountForm.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="teacher" label="导师">
                <el-input type="text" v-model="studentAccountForm.teacher"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="topic" label="研究课题">
                <el-input type="text" v-model="studentAccountForm.topic"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-btn-group">
            <template v-if="dialog.status === 'create'">
              <el-button type="primary" @click="submitCreate('student')" :loading="loading">立即创建</el-button>
            </template>
            <template v-else-if="dialog.status === 'modify'">
              <el-button type="primary" @click="submitModify('student')" :loading="loading">立即保存</el-button>
            </template>
            <el-button @click="dialog.studentAccount=false">关闭</el-button>
          </div>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.teacherAccount">
      <el-dialog class="accountForm-dialog" title="导师账号" size="large" v-model="dialog.teacherAccount" :close-on-click-modal=false>
        <h3 class="tip">账号信息：</h3>
        <el-form ref="teacherAccountForm" class="createAccount-form" :model="teacherAccountForm" :rules="rules.teacherAccount" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="username" label="姓名">
                <el-input type="text" v-model="teacherAccountForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="gender" label="性别">
                <el-select style="width: 100%;" v-model="teacherAccountForm.gender" placeholder="请选择">
                  <el-option label="男" value="m"></el-option>
                  <el-option label="女" value="f"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="_id" label="工号">
                <el-input type="text" v-model="teacherAccountForm._id" :readonly="dialog.status === 'modify'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="education" label="学历">
                <el-input type="text" v-model="teacherAccountForm.education"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="position" label="职位职称">
                <el-input type="text" v-model="teacherAccountForm.position"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="academyID" label="学院">
                <el-select style="width: 100%;" v-model="teacherAccountForm.academyID" placeholder="请选择">
                  <el-option
                    v-for="item in academyOptions"
                    :label="item.value"
                    :key="item._id"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="ID" label="身份证号">
                <el-input type="text" v-model="teacherAccountForm.ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="mobile" label="手机">
                <el-input type="text" v-model="teacherAccountForm.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="email" label="邮箱">
                <el-input type="text" v-model="teacherAccountForm.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="students" label="指导学生">
                <el-input type="text" v-model="teacherAccountForm.studentsText"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="input-wrapper" prop="topic" label="提供课题">
                <el-input type="text" v-model="teacherAccountForm.topicsText"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-btn-group">
            <template v-if="dialog.status === 'create'">
              <el-button type="primary" @click="submitCreate('teacher')" :loading="loading">立即创建</el-button>
            </template>
            <template v-else-if="dialog.status === 'modify'">
              <el-button type="primary" @click="submitModify('teacher' :loading="loading")">立即保存</el-button>
            </template>
            <el-button @click="dialog.teacherAccount=false">关闭</el-button>
          </div>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.adminAccount">
      <el-dialog class="accountForm-dialog" title="管理员账号" size="large" v-model="dialog.adminAccount" :close-on-click-modal=false>
        <h3 class="tip">账号信息：</h3>
        <el-form ref="adminAccountForm" class="createAccount-form" :model="adminAccountForm" :rules="rules.adminAccount" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="username" label="姓名">
                <el-input type="text" v-model="adminAccountForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="gender" label="性别">
                <el-select style="width: 100%;" v-model="adminAccountForm.gender" placeholder="请选择">
                  <el-option label="男" value="m"></el-option>
                  <el-option label="女" value="f"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="_id" label="工号">
                <el-input type="text" v-model="adminAccountForm._id" :readonly="dialog.status === 'modify'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="level" label="级别">
                <el-select style="width: 100%;" v-model="adminAccountForm.level" placeholder="请选择">
                  <el-option label="院级" :value="Number('1')"></el-option>
                  <el-option label="校级" :value="Number('2')"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item class="input-wrapper" prop="academyID" label="学院">
              <el-select style="width: 100%;" v-model="adminAccountForm.academyID" placeholder="请选择">
                <el-option
                  v-for="item in academyOptions"
                  :label="item.value"
                  :key="item._id"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="ID" label="身份证号">
                <el-input type="text" v-model="adminAccountForm.ID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="mobile" label="手机">
                <el-input type="text" v-model="adminAccountForm.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="input-wrapper" prop="email" label="邮箱">
                <el-input type="text" v-model="adminAccountForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-btn-group">
            <template v-if="dialog.status === 'create'">
              <el-button type="primary" @click="submitCreate('admin')" :loading="loading">立即创建</el-button>
            </template>
            <template v-else-if="dialog.status === 'modify'">
              <el-button type="primary" @click="submitModify('admin')" :loading="loading">立即保存</el-button>
            </template>
            <el-button @click="dialog.adminAccount=false">关闭</el-button>
          </div>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message, MessageBox } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'account-manage',
    mixins: [mixins],
    data () {
      return {
        searchInput: '',
        dialog: {
          studentAccount: false,
          teacherAccount: false,
          adminAccount: false,
          searchResult: false,
          status: ''
        },
        currentIndex: 0,
        studentAccountForm: {},
        teacherAccountForm: {},
        adminAccountForm: {},
        rules: {
          studentAccount: {
            username: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别' }
            ],
            _id: [
              { required: true, message: '请输入学号', trigger: 'blur' }
            ],
            _class: [
              { required: true, message: '请输入班级', trigger: 'blur' }
            ],
            academyID: [
              { required: true, message: '请选择学院' }
            ],
            major: [
              { required: true, message: '请输入专业', trigger: 'blur' }
            ],
            ID: [
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/, message: '请输入正确的身份证号', trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: '请输入手机', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
            ],
          },
          teacherAccount: {
            username: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别' }
            ],
            _id: [
              { required: true, message: '请输入工号', trigger: 'blur' }
            ],
            academyID: [
              { required: true, message: '请选择学院' }
            ],
            education: [
              { required: true, message: '请输入学历', trigger: 'blur' }
            ],
            position: [
              { required: true, message: '请输入职位职称', trigger: 'blur' }
            ],
            ID: [
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/, message: '请输入正确的身份证号', trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: '请输入手机', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
            ],
          },
          adminAccount: {
            username: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别' }
            ],
            _id: [
              { required: true, message: '请输入工号', trigger: 'blur' }
            ],
            academyID: [
              { required: true, message: '请选择学院' }
            ],
            ID: [
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/, message: '请输入正确的身份证号', trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: '请输入手机', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
            ],
            level: [
              { required: true, type: 'number', message: '请输入正确形式的级别', trigger: 'blur' },
            ],
          }
        }
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      academyOptions: ({ global }) => global.academy.value,
      studentAccounts: ({ account }) => account.students.value,
      teacherAccounts: ({ account }) => account.teachers.value,
      adminAccounts: ({ account }) => account.admins.value,
      academyValues () {
        return this.academyOptions.map(item => ({
          text: item.value,
          value: item._id
        }));
      }
    }),
    methods: {
      formatterAcademy (row) {
        return this.academyOptions[row.academyID - 1].value;
      },
      formatterLevel (row) {
        return row.level === 1 ? '院级' : '校级';
      },
      formatterTopic (row) {
        return row.topics.length > 0 ? row.topics.join('；') : '暂未提供课题';
      },
      filterAcademy (value, row) {
        return row.academyID === value;
      },
      // searchSubmit () {
      //   Message.success('搜索成功');
      // },
      submitDelete (index, _id, identity) {
        MessageBox.confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => store.dispatch('account/DELETE', {
          index,
          data: {
            identity,
            _id
          }
        })
        ).then(() => {
          Message.closeAll();
          Message.success('删除成功');
        }, () => false)
        .catch(() => {
          Message.closeAll();
          Message.info('已取消');
        });
      },
      createAccount (identity) {
        this.dialog.status = 'create';
        switch (identity) {
          case 'student':
            this.studentAccountForm = {};
            this.dialog.studentAccount = true;
            break;
          case 'teacher':
            this.teacherAccountForm = {};
            this.dialog.teacherAccount = true;
            break;
          case 'admin':
            this.adminAccountForm = {};
            this.dialog.adminAccount = true;
            break;
          default:
        }
      },
      modifyAccount (index, data, identity) {
        this.currentIndex = index;
        this.dialog.status = 'modify';
        switch (identity) {
          case 'student':
            this.studentAccountForm = JSON.parse(JSON.stringify(data));
            this.dialog.studentAccount = true;
            break;
          case 'teacher':
            this.teacherAccountForm = JSON.parse(JSON.stringify(data));
            this.teacherAccountForm.studentsText = this.teacherAccountForm.students.join('；');
            this.teacherAccountForm.topicsText = this.teacherAccountForm.topics.join('；');
            this.dialog.teacherAccount = true;
            break;
          case 'admin':
            this.adminAccountForm = JSON.parse(JSON.stringify(data));
            this.dialog.adminAccount = true;
            break;
          default:
        }
      },
      submitModify (identity) {
        switch (identity) {
          case 'student':
            this.$refs.studentAccountForm.validate((valid) => {
              if (valid) {
                if (JSON.stringify(this.studentAccounts[this.currentIndex]) === JSON.stringify(this.studentAccountForm)) {
                  Message.closeAll();
                  Message.warning('未有任何更改');
                  return false;
                }
                return store.dispatch('account/MODIFY_STUDENT', Object.assign({
                  identity: 'student'
                }, this.studentAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('保存成功');
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          case 'teacher':
            this.$refs.teacherAccountForm.validate((valid) => {
              if (valid) {
                if (JSON.stringify(this.teacherAccounts[this.currentIndex]) === JSON.stringify(this.teacherAccountForm)) {
                  Message.closeAll();
                  Message.warning('未有任何更改');
                  return false;
                }
                return store.dispatch('account/MODIFY_TEACHER', Object.assign({
                  identity: 'teacher'
                }, this.teacherAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('保存成功');
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          case 'admin':
            this.$refs.adminAccountForm.validate((valid) => {
              if (valid) {
                if (JSON.stringify(this.adminAccounts[this.currentIndex]) === JSON.stringify(this.adminAccountForm)) {
                  Message.closeAll();
                  Message.warning('未有任何更改');
                  return false;
                }
                return store.dispatch('account/MODIFY_ADMIN', Object.assign({
                  identity: 'admin'
                }, this.adminAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('保存成功');
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          default:
        }
        return false;
      },
      submitCreate (identity) {
        switch (identity) {
          case 'student':
            this.$refs.studentAccountForm.validate((valid) => {
              if (valid) {
                return store.dispatch('account/CREATE', Object.assign({
                  identity: 'student'
                }, this.studentAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('创建成功');
                    this.dialog.studentAccount = false;
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          case 'teacher':
            this.$refs.teacherAccountForm.validate((valid) => {
              if (valid) {
                return store.dispatch('account/CREATE', Object.assign({
                  identity: 'teacher'
                }, this.teacherAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('创建成功');
                    this.dialog.teacherAccount = false;
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          case 'admin':
            this.$refs.adminAccountForm.validate((valid) => {
              if (valid) {
                return store.dispatch('account/CREATE', Object.assign({
                  identity: 'admin'
                }, this.adminAccountForm))
                  .then(() => {
                    Message.closeAll();
                    Message.success('创建成功');
                    this.dialog.adminAccount = false;
                  })
                  .catch(() => false);
              }
              return this.showInvalidateMsg();
            });
            break;
          default:
        }
        return false;
      }
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.global.academy.loaded) loads.push(store.dispatch('global/LOAD_ACADEMY'));
      if (!store.state.account.students.loaded) loads.push(store.dispatch('account/LOAD_STUDENTS'));
      if (!store.state.account.teachers.loaded) loads.push(store.dispatch('account/LOAD_TEACHERS'));
      if (!store.state.account.admins.loaded) loads.push(store.dispatch('account/LOAD_ADMINS'));
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
