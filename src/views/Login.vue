<template>
  <div class="main-container">
    <div class="main-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/images/logo_400x400.png" alt="logo">
      </div>
      <h1 class="title">毕业设计（论文）系统</h1>
      <h2 class="sub-title">让毕设变得更方便、高效和优秀</h2>
      <form class="login-form">
        <div class="input-group">
          <div class="input-wrapper">
            <input class="input-dom account" placeholder="账号" type="text" v-model="loginData.account">
          </div>
          <div class="input-wrapper">
            <input class="input-dom pwd" placeholder="密码" type="password" v-model="loginData.pwd">
          </div>
        </div>
        <div class="radio-group wrapper-marginTop">
          <el-radio v-model="loginData.level" label="student">学生</el-radio>
          <el-radio v-model="loginData.level" label="teacher">导师</el-radio>
          <el-radio v-model="loginData.level" label="admin">管理员</el-radio>
        </div>
        <div class="login-btn-wrapper wrapper-marginTop">
          <button class="button-dom full-width default-color login" type="submit" @click.prevent="login">登录</button>
        </div>
        <div class="misc-btn-wrapper wrapper-marginTop">
          <button class="button-dom text default-color find-pwd" @click.prevent="showDialog('findPwd', '找回密码')">找回密码</button>
          <button class="button-dom text not-account" @click.prevent="showDialog('register', '申请账号（仅限学生）')">账号不存在？</button>
        </div>
      </form>
    </div>
    <el-dialog class="dialog-form" :title="dialog.title" size="tiny" top="24%" v-model="dialog.show" @close="resetData">
      <template v-if="dialog.name === 'findPwd'">
        <h3 class="tip">{{findPwd.tip[findPwd.step]}}</h3>
        <form class="form findPwd-form">
          <template v-if="findPwd.step < 2">
            <div class="input-wrapper">
              <input class="input-dom" placeholder="请输入绑定的邮箱" type="text" v-model="findPwdData.boundEmail" :readonly="findPwd.step !== 0">
            </div>
          </template>
          <template v-if="findPwd.step === 1">
            <div class="inline-btn-wrapper">
              <button class="button-dom" type="button" @click.prevent="findPwd.step=0">修改</button>
            </div>
            <div class="input-wrapper">
              <input class="input-dom" placeholder="请输入收到的验证码" type="text" v-model="findPwdData.captcha" :readonly="findPwd.step !== 1">
            </div>
            <div class="inline-btn-wrapper">
              <button class="button-dom" @click.prevent="">重新获取验证码</button>
            </div>
          </template>
          <template v-if="findPwd.step === 2">
            <div class="input-wrapper">
              <input class="input-dom" placeholder="请设置新密码" type="password" v-model="findPwdData.newPwd">
            </div>
            <div class="input-wrapper">
              <input class="input-dom" placeholder="请再次输入新密码" type="password" v-model="findPwdData.repeatPwd">
            </div>
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
        </form>
      </template>
      <template v-else-if="dialog.name === 'register'">
        <h3 class="tip">请填写本人信息：</h3>
        <form class="form register-form">
          <div class="input-wrapper">
            <input class="input-dom" placeholder="姓名" type="text" v-model="registerData.name">
          </div>
          <div class="input-wrapper">
            <input class="input-dom" placeholder="学号" type="text" v-model="registerData.srudentID">
          </div>
          <div class="input-wrapper">
            <input class="input-dom" placeholder="身份证号" type="text" v-model="registerData.id">
          </div>
          <div class="input-wrapper">
            <input class="input-dom" placeholder="邮箱" type="text" v-model="registerData.email">
          </div>
          <div class="wrapper-marginTop">
            <button class="button-dom full-width default-color" @click.prevent="" type="submit">申请</button>
          </div>
        </form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import router from '@/router';
  import { Radio, Dialog } from 'element-ui';

  Vue.use(Radio);
  Vue.use(Dialog);

  export default {
    name: 'login',
    data () {
      return {
        loginData: {
          account: '',
          pwd: '',
          level: '',
        },
        registerData: {
          name: '',
          studentID: '',
          id: '',
          mobile: '',
          email: ''
        },
        findPwdData: {
          boundEmail: '',
          captcha: '',
          newPwd: '',
          repeatPwd: ''
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
          show: false,
          name: '',
          title: ''
        }
      };
    },
    methods: {
      login () {
        router.push(`${this.loginData.level}/home`);
      },
      showDialog (name, title) {
        this.dialog.show = true;
        this.dialog.name = name;
        this.dialog.title = title;
      },
      resetData () {
        const temp = this.loginData;
        Object.assign(this.$data, this.$options.data());
        this.loginData = temp;
      }
    },
    beforeRouteEnter (to, from, next) {
      const level = to.matched[0].meta.level;
      next((vm) => {
        vm.$data.loginData.level = level;
      });
    },
    beforeRouteLeave (to, from, next) {
      from.matched[0].meta.level = this.loginData.level;
      next();
    }
  };
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  @import "../styles/mixin";
  .main-container {
    position: relative;
    height: 100%;
    background-color: $background;
    text-align: center;
    &:after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
  .main-wrapper {
    display: inline-block;
    width: 320px;
    padding: 30px;
    background-color: #fff;
    vertical-align: middle;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: all .4s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.2);
    }
    .logo-wrapper {
      margin-bottom: 16px;
      text-align: center;
      img {
        width: 120px;
      }
    }
    .title {
      font-size: 32px;
      color: $blue;
      cursor: default;
    }
    .sub-title {
      margin: 20px 0;
      font-size: 18px;
      cursor: default;
    }
  }
  .wrapper-marginTop {
    margin-top: 18px;
  }
  .misc-btn-wrapper {
    @include clearfloat;
  }
  .input-group {
    padding: 1px 0;
    border: 1px solid #d5d5d5;
    border-radius: 4px;
    .input-wrapper + .input-wrapper {
      border-top: 1px solid #e8e8e8;
    }
  }
  .input-dom {
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    position: relative;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
  }
  .button-dom {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    line-height: 40px;
    cursor: pointer;
    &.full-width {
      width: 100%;
    }
    &.default-color {
      background-color: $blue;
      color: #fff;
      &:hover {
        background-color: $lightBlue;
      }
    }
    &.text {
      line-height: 1;
      &.default-color {
        background-color: transparent;
        color: $blue;
        &:hover {
          color: $lightBlue;
        }
      }
    }
    &.find-pwd {
      float: left;
      font-size: 14px;
    }
    &.not-account {
      float: right;
      font-size: 14px;
      &:hover {
        color: $blue;
      }
    }
  }
  .dialog-form {
    text-align: left;
    .tip {
      font-size: 14px;
      line-height: 24px;
    }
    .form {
      margin-top: 10px;
    }
    .input-dom {
      border-bottom: 1px solid #e8e8e8;
    }
    .inline-btn-wrapper {
      position: relative;
      .button-dom {
        position: absolute;
        top: -44px;
        right: 10px;
        font-size: 14px;
        color: $blue;
        z-index: 99;
        &:hover {
          color: $lightBlue;
        }
      }
    }
  }
</style>
