<style scoped lang="scss" src="./Login.scss"></style>

<template>
  <div class="main-container">
    <div class="main-wrapper">
      <div class="logo-wrapper">
        <img src="~@/assets/images/logo_400x400.png" alt="logo">
      </div>
      <h1 class="title">毕业设计（论文）系统</h1>
      <h2 class="sub-title">让毕设变得更方便、高效和优秀</h2>
      <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="rules.login">
        <div class="input-group">
          <el-form-item class="input-wrapper login-view--formItem" prop="account">
            <el-input class="login-view--input" type="text" placeholder="账号" v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper login-view--formItem" prop="pwd">
            <el-input class="login-view--input" type="password" placeholder="密码" v-model="loginForm.pwd"></el-input>
          </el-form-item>
        </div>
        <el-radio-group class="radio-group" v-model="loginForm.level">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">导师</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
        <div class="login-btn-wrapper wrapper-marginTop">
          <button class="button-dom full-width default-color login" type="submit" @click.prevent="login">登录</button>
        </div>
      </el-form>
      <div class="misc-btn-wrapper wrapper-marginTop">
        <button class="button-dom text default-color find-pwd" @click.prevent="dialog.findPwdForm=true">找回密码</button>
        <button class="button-dom text not-account" @click.prevent="dialog.registerForm=true">账号不存在？</button>
      </div>
    </div>
    <template v-if="dialog.findPwdForm">
      <el-dialog class="dialog-form" title="找回密码" size="tiny" v-model="dialog.findPwdForm" @open="closeFindPwdForm">
        <h3 class="tip">{{findPwd.tip[findPwd.step]}}</h3>
        <el-form ref="findPwdForm" class="form findPwd-form" :model="findPwdForm" :rules="rules.findPwd">
          <template v-if="findPwd.step < 2">
            <el-form-item class="input-wrapper" prop="boundEmail">
              <el-input class="login-view--input" type="text" placeholder="请输入绑定的邮箱" v-model="findPwdForm.boundEmail" :readonly="findPwd.step !== 0"></el-input>
            </el-form-item>
          </template>
          <template v-if="findPwd.step === 1">
            <div class="inline-btn-wrapper">
              <button class="button-dom" type="button" @click.prevent="findPwd.step=0">修改</button>
            </div>
            <el-form-item class="input-wrapper" prop="captcha">
              <el-input class="login-view--input" type="text" placeholder="请输入收到的验证码" v-model="findPwdForm.captcha" :readonly="findPwd.step !== 1"></el-input>
            </el-form-item>
            <!-- <div class="inline-btn-wrapper">
              <button class="button-dom" @click.prevent="">重新获取验证码</button>
            </div> -->
          </template>
          <template v-if="findPwd.step === 2">
            <el-form-item class="input-wrapper" prop="newPwd">
              <el-input class="login-view--input" type="password" placeholder="请设置新密码" v-model="findPwdForm.newPwd"></el-input>
            </el-form-item>
            <el-form-item class="input-wrapper" prop="repeatPwd">
              <el-input class="login-view--input" type="password" placeholder="请再次输入新密码" v-model="findPwdForm.repeatPwd"></el-input>
            </el-form-item>
          </template>
          <template v-if="findPwd.step < 2">
            <div class="next-btn-wrapper wrapper-marginTop">
              <button class="button-dom  full-width default-color" @click.prevent="findPwd.step += 1" type="submit">下一步</button>
            </div>
          </template>
          <template v-if="findPwd.step === 2">
            <div class="submit-btn-wrapper wrapper-marginTop">
              <button class="button-dom  full-width default-color" @click.prevent="" type="submit">提交</button>
            </div>
          </template>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.registerForm">
      <el-dialog class="dialog-form" title="申请账号（仅限学生）" size="tiny" v-model="dialog.registerForm" @open="resetForm('registerForm')">
        <h3 class="tip">请填写本人信息：</h3>
        <el-form ref="registerForm" class="form register-form" :model="registerForm" :rules="rules.register">
          <el-form-item class="input-wrapper" prop="name">
            <el-input class="login-view--input" type="text" placeholder="姓名" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="gender">
            <el-input class="login-view--input" type="text" placeholder="性别" v-model="registerForm.gender"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="studentID">
            <el-input class="login-view--input" type="text" placeholder="学号" v-model="registerForm.studentID"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="class">
            <el-input class="login-view--input" type="text" placeholder="班级" v-model="registerForm.class"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="academy">
            <el-input class="login-view--input" type="text" placeholder="学院" v-model="registerForm.academy"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="major">
            <el-input class="login-view--input" type="text" placeholder="专业" v-model="registerForm.major"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="ID">
            <el-input class="login-view--input" type="text" placeholder="身份证号" v-model="registerForm.ID"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="mobile">
            <el-input class="login-view--input" type="text" placeholder="手机" v-model="registerForm.mobile"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="email">
            <el-input class="login-view--input" type="text" placeholder="邮箱" v-model="registerForm.email"></el-input>
          </el-form-item>
          <div class="wrapper-marginTop">
            <button class="button-dom full-width default-color" @click.prevent="" type="submit">申请</button>
          </div>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import router from '@/router';
  import mixins from '@/mixins';

  export default {
    name: 'login',
    mixins: [mixins],
    data () {
      return {
        loginForm: {
          account: '',
          pwd: '',
          level: '',
        },
        registerForm: {
          name: '',
          gender: '',
          studentID: '',
          class: '',
          academy: '',
          major: '',
          ID: '',
          mobile: '',
          email: ''
        },
        findPwdForm: {
          boundEmail: '',
          captcha: '',
          newPwd: '',
          repeatPwd: ''
        },
        rules: {
          login: {
            account: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            pwd: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          },
          findPwd: {
            boundEmail: [
              { required: true, message: '请输入绑定的邮箱', trigger: 'blur' }
            ],
            captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' }
            ],
            newPwd: [
              { required: true, message: '请输入新密码', trigger: 'blur' }
            ],
            repeatPwd: [
              { required: true, message: '请再次输入新密码', trigger: 'blur' }
            ]
          },
          register: {
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
        findPwd: {
          step: 0, // 0:填写绑定邮箱  1：填写验证码  2：重置密码
          tip: [
            '验证码将会发送至你初次登陆后绑定的邮箱',
            '验证码已发送，请查收后填写',
            '验证码填写正确，请重新设置登陆密码',
          ],
        },
        dialog: {
          findPwdForm: false,
          registerForm: false
        }
      };
    },
    methods: {
      login () {
        router.push(`${this.loginForm.level}/home`);
      },
      closeFindPwdForm () {
        this.resetForm('findPwdForm');
        this.findPwd.step = 0;
      }
    },
    beforeRouteEnter (to, from, next) {
      const level = to.matched[0].meta.level;
      next((vm) => {
        vm.$data.loginForm.level = level;
      });
    },
    beforeRouteLeave (to, from, next) {
      from.matched[0].meta.level = this.loginForm.level;
      next();
    }
  };
</script>
