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
          <el-form-item class="input-wrapper login-view--formItem" prop="_id">
            <el-input class="login-view--input" type="text" placeholder="账号" v-model="loginForm._id"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper login-view--formItem" prop="originalPwd">
            <el-input class="login-view--input" type="password" placeholder="密码" v-model="loginForm.originalPwd"></el-input>
          </el-form-item>
        </div>
        <el-radio-group class="radio-group" v-model="loginForm.identity">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">导师</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
        <div class="login-btn-wrapper wrapper-marginTop">
          <button class="button-dom full-width default-color login" type="submit" :disabled="loading" @click.prevent="login">登录</button>
        </div>
      </el-form>
      <div class="misc-btn-wrapper wrapper-marginTop">
        <button class="button-dom text default-color find-pwd" @click.prevent="dialog.findPwdForm=true">找回密码</button>
        <button class="button-dom text not-account" @click.prevent="dialog.applyForm=true">账号不存在？</button>
      </div>
    </div>
    <template v-if="dialog.findPwdForm">
      <el-dialog class="dialog-form" title="找回密码" size="tiny" v-model="dialog.findPwdForm"  :close-on-click-modal=false @open="openFindPwdForm">
        <h3 class="tip">{{findPwd.tip[findPwd.step]}}</h3>
        <el-form ref="findPwdForm" class="form findPwd-form" :model="findPwdForm" :rules="rules.findPwd">
          <template v-if="findPwd.step < 2">
            <el-form-item class="input-wrapper login-view--select" prop="identity">
              <el-select class="select-full-width" v-model="findPwdForm.identity" :disabled="this.findPwd.step !== 0" placeholder="账号类型">
                <el-option label="学生" value="student"></el-option>
                <el-option label="导师" value="teacher"></el-option>
                <el-option label="管理员" value="admin"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input-wrapper" prop="boundEmail">
              <el-input class="login-view--input" type="text" placeholder="绑定的邮箱" v-model="findPwdForm.boundEmail" :readonly="findPwd.step !== 0"></el-input>
            </el-form-item>
          </template>
          <template v-if="findPwd.step === 1">
            <div class="inline-btn-wrapper">
              <button class="button-dom" type="button" @click.prevent="findPwd.step=0">修改</button>
            </div>
            <el-form-item class="input-wrapper" prop="captcha">
              <el-input class="login-view--input" type="text" placeholder="请输入收到的验证码" v-model="findPwdForm.captcha" :readonly="findPwd.step !== 1"></el-input>
            </el-form-item>
          </template>
          <template v-if="findPwd.step === 2">
            <el-form-item class="input-wrapper" prop="newPwd">
              <el-input class="login-view--input" type="password" placeholder="请设置新密码" v-model="findPwdForm.newPwd"></el-input>
            </el-form-item>
            <el-form-item class="input-wrapper" prop="repeatPwd">
              <el-input class="login-view--input" type="password" placeholder="请再次输入新密码" v-model="findPwdForm.repeatPwd"></el-input>
            </el-form-item>
          </template>
          <div class="next-btn-wrapper wrapper-marginTop">
            <button class="button-dom  full-width default-color" @click.prevent="forgetPwd" type="submit">{{findPwd.step < 2 ? '下一步' : '提交'}}</button>
          </div>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.applyForm">
      <el-dialog class="dialog-form" title="申请账号（仅限学生）" size="tiny" v-model="dialog.applyForm" :close-on-click-modal=false @open="resetForm('applyForm')">
        <h3 class="tip">请填写本人信息：</h3>
        <el-form ref="applyForm" class="form apply-form" :model="applyForm" :rules="rules.apply">
          <el-form-item class="input-wrapper" prop="username">
            <el-input class="login-view--input" type="text" placeholder="姓名" v-model="applyForm.username"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper login-view--select" prop="gender">
            <el-select class="select-full-width" v-model="applyForm.gender" placeholder="性别">
              <el-option label="男" value="m"></el-option>
              <el-option label="女" value="f"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="_id">
            <el-input class="login-view--input" type="text" placeholder="学号" v-model="applyForm._id"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper login-view--select" prop="academy">
            <el-select class="select-full-width" v-model="applyForm.academy" placeholder="学院">
              <el-option label="计算机与通信工程学院" value="计算机与通信工程学院"></el-option>
              <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="class">
            <el-input class="login-view--input" type="text" placeholder="班级" v-model="applyForm.class"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="major">
            <el-input class="login-view--input" type="text" placeholder="专业" v-model="applyForm.major"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="ID">
            <el-input class="login-view--input" type="text" placeholder="身份证号" v-model="applyForm.ID"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="mobile">
            <el-input class="login-view--input" type="mobile" placeholder="手机" v-model="applyForm.mobile"></el-input>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="email">
            <el-input class="login-view--input" type="text" placeholder="邮箱" v-model="applyForm.email"></el-input>
          </el-form-item>
          <div class="wrapper-marginTop">
            <button class="button-dom full-width default-color" @click.prevent="apply" type="submit">申请</button>
          </div>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import router from '@/router';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'login-view',
    mixins: [mixins],
    data () {
      const validateRepeatPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.findPwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          _id: '',
          originalPwd: '',
          identity: 'student',
        },
        applyForm: {
          username: '',
          identity: 'student',
          gender: '',
          _id: '',
          class: '',
          academy: '',
          major: '',
          ID: '',
          mobile: '',
          email: ''
        },
        findPwdForm: {
          identity: '',
          boundEmail: '',
          captcha: '',
          newPwd: '',
          repeatPwd: ''
        },
        rules: {
          login: {
            _id: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            originalPwd: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          },
          findPwd: {
            identity: [
              { required: true, message: '请选择账号类型' }
            ],
            boundEmail: [
              { required: true, message: '请输入绑定的邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
            ],
            captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { type: /^[A-Za-z0-9]{4}$/, message: '请输入正确形式的验证码', trigger: 'blur' }
            ],
            newPwd: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
              { min: 6, max: 12, message: '请输入6~12位的新密码', trigger: 'blur' }
            ],
            repeatPwd: [
              { validator: validateRepeatPass, trigger: 'blur' }
            ]
          },
          apply: {
            username: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '请选择性别' }
            ],
            _id: [
              { required: true, message: '请输入学号', trigger: 'blur' }
            ],
            class: [
              { required: true, message: '请输入班级', trigger: 'blur' }
            ],
            academy: [
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
              { required: true, message: '请输入手机', trigger: 'blur' },
              { pattern: /^1(3|4|5|7|8)[0-9]\d{8}/, message: '请输入正确的手机号码', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
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
          applyForm: false
        }
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      identity: ({ auth }) => auth.identity,
      forgetPwd_id: ({ user }) => user.forgetPwd_id,
    }),
    methods: {
      login () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            return this.$store.dispatch('auth/LOGIN', this.loginForm).then(() => {
              router.push(`${this.identity}/home`);
            }, () => false);
          }
          return Message.error('请填写账号或者密码');
        });
      },
      apply () {
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            return this.$store.dispatch('user/APPLY', this.applyForm).then(() => {
              Message.success('申请成功，申请通过后将会以邮件形式告知');
              this.dialog.applyForm = false;
            }, () => false);
          }
          return Message.error('请按要求填写信息');
        });
      },
      forgetPwd () {
        this.$refs.findPwdForm.validate((valid) => {
          if (valid) {
            switch (this.findPwd.step) {
              case 0: {
                const { identity, boundEmail } = this.findPwdForm;
                return this.$store.dispatch('user/FORGET_PASSWORD', { identity, boundEmail }).then(() => {
                  this.findPwd.step += 1;
                }, () => false);
              }
              case 1: {
                const { identity, boundEmail, captcha } = this.findPwdForm;
                return this.$store.dispatch('user/VALIDATE_CAPTCHA', { identity, boundEmail, captcha }).then(() => {
                  this.findPwd.step += 1;
                }, () => false);
              }
              case 2: {
                const { forgetPwd_id, newPwd } = this.findPwdForm;
                return this.$store.dispatch('user/SET_PASSWORD', { forgetPwd_id, newPwd }).then(() => {
                  Message.success('设置新密码成功，请登录');
                  this.findPwd.step = 0;
                  this.dialog.findPwdForm = false;
                }, () => false);
              }
              default:
            }
          }
          return Message.error('请按要求填写信息');
        });
      },
      openFindPwdForm () {
        this.resetForm('findPwdForm');
        this.findPwd.step = 0;
      }
    },
    beforeRouteEnter (to, from, next) {
      const token = window.localStorage.getItem('token');
      if (token) {
        return store.dispatch('auth/LOAD').then(
          () => next({
            path: `${store.state.auth.identity}/home`
          }),
          () => next()
        );
      }
      return next();
    }
  };
</script>
