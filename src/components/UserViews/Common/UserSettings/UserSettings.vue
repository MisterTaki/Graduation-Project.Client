<style scoped lang="scss" src="./UserSettings.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <el-form class="form basic-form" label-position="top" :model="basicForm">
        <h2 class="form-title">基本信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input class="input" v-model="basicForm.name" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别">
              <el-input v-model="basicForm.gender" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="学号">
              <el-input v-model="basicForm.ID" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级">
              <el-input v-model="basicForm.class" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="学院">
              <el-input v-model="basicForm.academy" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="专业">
              <el-input v-model="basicForm.major" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="身份证号">
              <el-input v-model="basicForm.studentID" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份">
              <el-input v-model="basicForm.level" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form class="form revise-form" label-position="top" :model="reviseForm">
        <h2 class="form-title">绑定信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="邮箱">
              <el-input class="edit-input" v-model="reviseForm.email" :readonly="true"></el-input>
              <el-button type="text" class="edit-btn">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机">
              <el-input v-model="reviseForm.mobile" :readonly="true"></el-input>
              <el-button type="text" class="edit-btn">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form class="form login-form" label-position="top">
        <h2 class="form-title">登录信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="密码">
              <el-input class="edit-input" value="********" :readonly="true" type="text"></el-input>
              <el-button type="text" class="edit-btn" @click="dialog.show=true">修改<i class="el-icon-edit el-icon--right" @click="modal.show=true"></i></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template v-if="dialog.show">
      <el-dialog class="dialog-form" title="修改密码" size="tiny" top="24%" v-model="dialog.show" @open="openChangePwdForm">
        <h3 class="tip">{{changePwd.tip[changePwd.step]}}</h3>
        <el-form v-if="changePwd.step === 0" ref="pwdForm_1" class="form pwd-form" label-position="left" :model="pwdForm_1" :rules="rules.pwdForm_1">
          <el-form-item prop="oldPwd">
            <el-input v-model="pwdForm_1.oldPwd" type="password" placeholder="旧密码："></el-input>
          </el-form-item>
          <el-button @click="changePwd.step=1" type="primary" class="submit-btn">下一步</el-button>
        </el-form>
        <el-form v-else-if="changePwd.step === 1" ref="pwdForm_2" class="form pwd-form" label-position="left" :model="pwdForm_2" :rules="rules.pwdForm_2">
          <el-form-item prop="newPwd">
            <el-input v-model="pwdForm_2.newPwd" type="password" placeholder="新密码："></el-input>
          </el-form-item>
          <el-form-item prop="repeatPwd">
            <el-input v-model="pwdForm_2.repeatPwd" type="password" placeholder="确认新密码："></el-input>
          </el-form-item>
          <el-button type="primary" class="submit-btn">提交</el-button>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import mixins from '@/mixins';

  export default {
    name: 'user-settings',
    mixins: [mixins],
    data () {
      return {
        basicForm: {
          name: '高琦',
          gender: '男',
          ID: '41355025',
          studentID: 'XXXXXXXXXXXXXXXXXX',
          class: '计1301',
          academy: '计算机与通信工程',
          major: '计算机科学与技术',
          level: '学生'
        },
        reviseForm: {
          email: 'ustb_gaoqi@163.com',
          mobile: '15652063671'
        },
        pwdForm_1: {
          oldPwd: '',
        },
        pwdForm_2: {
          newPwd: '',
          repeatPwd: ''
        },
        rules: {
          pwdForm_1: {
            oldPwd: [
              { required: true, message: '请输入旧密码', trigger: 'blur' }
            ]
          },
          pwdForm_2: {
            newPwd: [
              { required: true, message: '请输入新密码', trigger: 'blur' }
            ],
            repeatPwd: [
              { required: true, message: '请再次输入新密码', trigger: 'blur' }
            ]
          }
        },
        dialog: {
          show: false
        },
        changePwd: {
          step: 0,
          tip: [
            '请输入旧密码以验证身份',
            '旧密码验证正确，请重新设置登陆密码',
          ],
        }
      };
    },
    methods: {
      openChangePwdForm () {
        this.changePwd.step = 0;
        this.resetForm(['pwdForm_1', 'pwdForm_2']);
      }
    }
  };
</script>
