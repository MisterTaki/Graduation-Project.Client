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
        <el-button @click.prevent="submitLogin" type="primary" class="submit-btn" nativeType="submit" :loading="isLoading.login" :disabled="loading">登录</el-button>
      </el-form>
      <div class="misc-btn-wrapper">
        <el-button @click="openFindPwdForm" type="text" class="findPwd-btn">找回密码</el-button>
        <el-button @click="openApplyForm" type="text" class="applyAccount-btn">账号不存在？</el-button>
      </div>
    </div>
    <template v-if="dialog.findPwdForm">
      <el-dialog class="dialog-form" title="找回密码" size="tiny" :close-on-click-modal=false v-model="dialog.findPwdForm"  >
        <h3 class="tip">{{findPwd.tip[findPwd.step]}}</h3>
        <el-form ref="findPwdForm" class="form findPwd-form" :model="findPwdForm" :rules="rules.findPwd">
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
          <template v-if="findPwd.step === 1">
            <div class="inline-btn-wrapper">
              <el-button @click="findPwd.step = 0" type="text" class="back-btn">修改</el-button>
            </div>
            <el-form-item class="input-wrapper" prop="captcha">
              <el-input class="login-view--input" type="text" placeholder="请输入收到的验证码（6位）" v-model="findPwdForm.captcha"></el-input>
            </el-form-item>
            <el-form-item class="input-wrapper" prop="newPwd">
              <el-input class="login-view--input" type="password" placeholder="请设置新密码（6~12位）" v-model="findPwdForm.newPwd"></el-input>
            </el-form-item>
            <el-form-item class="input-wrapper" prop="repeatPwd">
              <el-input class="login-view--input" type="password" placeholder="请再次输入新密码（6~12位）" v-model="findPwdForm.repeatPwd"></el-input>
            </el-form-item>
          </template>
          <el-button @click.prevent="submitForgetPwd" type="primary" class="submit-btn" nativeType="submit" :loading="isLoading.forgetPwd" :disabled="loading">{{findPwd.step === 0 ? '下一步' : '提交'}}</el-button>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.applyForm">
      <el-dialog class="dialog-form" title="申请账号（仅限学生）" size="tiny" :close-on-click-modal=false v-model="dialog.applyForm">
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
          <el-form-item class="input-wrapper login-view--select" prop="academyID">
            <el-select class="select-full-width" v-model="applyForm.academyID" placeholder="学院">
              <el-option
                v-for="item in academyOptions"
                :label="item.value"
                :key="item._id"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-wrapper" prop="_class">
            <el-input class="login-view--input" type="text" placeholder="班级" v-model="applyForm._class"></el-input>
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
          <el-button @click.prevent="submitApply" type="primary" class="submit-btn" nativeType="submit" :loading="isLoading.apply" :disabled="loading">申请</el-button>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import router from '@/router';
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
          _class: '',
          academyID: '',
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
        isLoading: {
          login: false,
          forgetPwd: false,
          apply: false
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
              { pattern: /^[A-Za-z0-9]{6}$/, message: '请输入正确形式的验证码', trigger: 'blur' }
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
          step: 0, // 0:填写绑定邮箱  1：填写验证码并设置新密码
          tip: [
            '验证码将会发送至你绑定的邮箱',
            '验证码已发送，请查收后填写并设置新密码'
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
      academyOptions: ({ global }) => global.academy.value
    }),
    methods: {
      submitLogin () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.isLoading.login = true;
            return this.$store.dispatch('auth/LOGIN', this.loginForm).then(() => {
              router.push('/user/home');
              Message.success('登陆成功');
              this.isLoading.login = false;
            })
            .catch(() => {
              this.isLoading.login = false;
            });
          }
          return this.showInvalidateMsg();
        });
      },
      submitApply () {
        this.$refs.applyForm.validate((valid) => {
          if (valid) {
            this.isLoading.apply = true;
            return this.$store.dispatch('user/APPLY', this.applyForm).then(() => {
              Message.success('申请成功，申请通过后将会以邮件形式告知');
              this.isLoading.apply = false;
              this.dialog.applyForm = false;
            })
            .catch(() => {
              this.isLoading.apply = false;
            });
          }
          return this.showInvalidateMsg();
        });
      },
      submitForgetPwd () {
        this.$refs.findPwdForm.validate((valid) => {
          if (valid) {
            this.isLoading.forgetPwd = true;
            switch (this.findPwd.step) {
              case 0: {
                const { identity, boundEmail } = this.findPwdForm;
                return this.$store.dispatch('user/FORGET_PASSWORD', { identity, boundEmail })
                  .then(() => {
                    this.isLoading.forgetPwd = false;
                    this.findPwd.step += 1;
                  })
                  .catch(() => {
                    this.isLoading.forgetPwd = false;
                  });
              }
              case 1: {
                const { identity, boundEmail, captcha, newPwd } = this.findPwdForm;
                return this.$store.dispatch('user/SET_PASSWORD', { identity, boundEmail, captcha, newPwd })
                  .then(() => {
                    Message.success('设置新密码成功，请登录');
                    this.isLoading.forgetPwd = false;
                    this.dialog.findPwdForm = false;
                    this.findPwd.step = 0;
                  })
                  .catch(() => {
                    this.isLoading.forgetPwd = false;
                  });
              }
              default:
            }
          }
          return this.showInvalidateMsg();
        });
      },
      openFindPwdForm () {
        this.dialog.findPwdForm = true;
        this.resetForm('findPwdForm');
        this.findPwd.step = 0;
      },
      showApplyForm () {
        this.dialog.applyForm = true;
        this.resetForm('applyForm');
      },
      openApplyForm () {
        if (this.$store.state.global.academy.loaded) return this.showApplyForm();
        return this.$store.dispatch('global/LOAD_ACADEMY')
          .then(this.showApplyForm)
          .catch(() => false);
      }
    },
    beforeRouteEnter (to, from, next) {
      const token = window.localStorage.getItem('token');
      const username = window.localStorage.getItem('username');
      const identity = window.localStorage.getItem('identity');
      if (token && username && identity) {
        Message.closeAll();
        Message.success('自动登陆成功（如需返回登录页，请先注销）');
        return next('/user/home');
      }
      return next();
    }
  };
</script>
