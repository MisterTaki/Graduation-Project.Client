<style scoped lang="scss" src="./UserSettings.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <el-form class="form basic-form" label-position="top" :model="userInfo">
        <h2 class="form-title">基本信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input class="input" v-model="userInfo.username" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别">
              <el-input v-model="userInfo.gender" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item :label="_idLabel">
              <el-input v-model="userInfo._id" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="学院">
              <el-input v-model="userInfo.academy" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="身份证号">
              <el-input v-model="userInfo.ID" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份">
              <el-input v-model="userInfo.identity" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <template v-if="identity === 'student'">
            <el-col :span="10">
              <el-form-item label="班级">
                <el-input v-model="userInfo._class" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="专业">
                <el-input v-model="userInfo.major" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="identity === 'teacher'">
            <el-col :span="10">
              <el-form-item label="学历">
                <el-input v-model="userInfo.education" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="职位（职称）">
                <el-input v-model="userInfo.position" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col :span="10">
              <el-form-item label="权限级别">
                <el-input v-model="userInfo.level" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <el-form class="form bound-form" label-position="top" :model="userInfo">
        <h2 class="form-title">绑定信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="邮箱">
              <el-input class="edit-input" v-model="userInfo.email" :readonly="true"></el-input>
              <el-button type="text" class="edit-btn" @click="openModifyForm('Email')">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机">
              <el-input v-model="userInfo.mobile" :readonly="true"></el-input>
              <!-- <el-button type="text" class="edit-btn" @click="openModifyForm('Mobile')">修改<i class="el-icon-edit el-icon--right"></i></el-button> -->
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
              <el-button type="text" class="edit-btn" @click="openModifyForm('Pwd')">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template v-if="dialog.modifyPwd">
      <el-dialog class="dialog-form" title="修改密码" size="tiny" top="24%" v-model="dialog.modifyPwd">
        <h3 class="tip">请输入旧密码以验证身份并设置新密码</h3>
        <el-form ref="modifyPwdForm" class="form modifyPwd-form" label-position="left" :model="modifyPwdForm" :rules="rules.modifyPwdForm">
          <el-form-item prop="oldPwd">
            <el-input v-model="modifyPwdForm.oldPwd" type="password" placeholder="旧密码："></el-input>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input v-model="modifyPwdForm.newPwd" type="password" placeholder="新密码："></el-input>
          </el-form-item>
          <el-form-item prop="repeatPwd">
            <el-input v-model="modifyPwdForm.repeatPwd" type="password" placeholder="确认新密码："></el-input>
          </el-form-item>
          <el-button @click.prevent="submitModifyPwd" type="primary" class="submit-btn" nativeType="submit" :loading="loading" :disabled="loading">提交</el-button>
        </el-form>
      </el-dialog>
    </template>
    <template v-if="dialog.modifyEmail">
      <el-dialog class="dialog-form" title="修改邮箱" size="tiny" top="24%" v-model="dialog.modifyEmail">
        <h3 class="tip">请输入新邮箱以获得验证码进行验证</h3>
        <el-form ref="modifyEmailForm" class="form modifyEmail-form" label-position="left" :model="modifyEmailForm" :rules="rules.modifyEmailForm">
          <el-form-item prop="newEmail">
            <el-input type="text" placeholder="新邮箱" v-model="modifyEmailForm.newEmail" :readonly="modifyEmail.step !== 0"></el-input>
          </el-form-item>
          <template v-if="modifyEmail.step === 1">
            <div class="inline-btn-wrapper">
              <el-button @click="modifyEmail.step = 0" type="text" class="back-btn">修改</el-button>
            </div>
            <el-form-item class="input-wrapper" prop="captcha">
              <el-input type="text" placeholder="请输入收到的验证码（6位）" v-model="modifyEmailForm.captcha"></el-input>
            </el-form-item>
          </template>
          <el-button @click.prevent="submitModifyEmail" type="primary" class="submit-btn" nativeType="submit" :loading="loading" :disabled="loading">{{modifyEmail.step === 0 ? '下一步' : '提交'}}</el-button>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';
  import { cnMap } from '@/helpers';

  export default {
    name: 'user-settings',
    mixins: [mixins],
    data () {
      const validateRepeatPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.modifyPwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        modifyPwdForm: {
          oldPwd: '',
          newPwd: '',
          repeatPwd: ''
        },
        modifyEmailForm: {
          newEmail: '',
          captcha: ''
        },
        rules: {
          modifyPwdForm: {
            oldPwd: [
              { required: true, message: '请输入旧密码', trigger: 'blur' },
              { min: 6, max: 12, message: '请输入6~12位的旧密码', trigger: 'blur' }
            ],
            newPwd: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
              { min: 6, max: 12, message: '请输入6~12位的新密码', trigger: 'blur' }
            ],
            repeatPwd: [
              { validator: validateRepeatPass, trigger: 'blur' }
            ]
          },
          modifyEmailForm: {
            newEmail: [
              { required: true, message: '请输入绑定的邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确形式的邮箱', trigger: 'blur' }
            ],
            captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { pattern: /^[A-Za-z0-9]{6}$/, message: '请输入正确形式的验证码', trigger: 'blur' }
            ]
          },
        },
        dialog: {
          modifyPwd: false,
          modifyEmail: false
        },
        modifyEmail: {
          step: 0
        }
      };
    },
    computed: mapState({
      identity: ({ auth }) => auth.identity,
      loading: ({ global }) => global.loading,
      academyList: ({ global }) => global.academy,
      userInfo ({ user }) {
        const { genderMap, identityMap } = cnMap;
        const { info } = user;
        const { academyID, gender, identity } = info;
        const academy = this.academyList[academyID - 1].value;
        if (identity === 'admin') {
          const { levelMap } = cnMap;
          const { level } = info;
          return {
            ...info,
            level: levelMap[level],
            gender: genderMap[gender],
            identity: identityMap[identity],
            academy
          };
        }
        return {
          ...info,
          gender: genderMap[gender],
          identity: identityMap[identity],
          academy
        };
      },
      _idLabel () {
        return this.identity === 'student' ? '学号' : '工号';
      }
    }),
    methods: {
      openModifyForm (formName) {
        this.dialog[`modify${formName}`] = true;
        this.resetForm(`modify${formName}Form`);
      },
      submitModifyPwd () {
        this.$refs.modifyPwdForm.validate((valid) => {
          if (valid) {
            const { oldPwd, newPwd } = this.modifyPwdForm;
            return store.dispatch('user/MODIFY_PASSWORD', { oldPwd, newPwd }).then(() => {
              Message.success('修改成功');
              this.dialog.modifyPwd = false;
            }, () => false);
          }
          return Message.error('请填写按要求填写');
        });
      },
      submitModifyEmail () {
        this.$refs.modifyEmailForm.validate((valid) => {
          if (valid) {
            switch (this.modifyEmail.step) {
              case 0: {
                const { newEmail } = this.modifyEmailForm;
                return store.dispatch('user/MODIFY_EMAIL', { newEmail }).then(() => {
                  this.modifyEmail.step += 1;
                }, () => false);
              }
              case 1: {
                return store.dispatch('user/SET_EMAIL', this.modifyEmailForm).then(() => {
                  Message.success('绑定新邮箱成功');
                  this.modifyEmail.step = 0;
                  this.dialog.modifyEmail = false;
                }, () => false);
              }
              default:
            }
          }
          return Message.error('请按要求填写信息');
        });
      }
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      loads.push(store.dispatch('user/LOAD'));
      if (store.state.global.academy.length === 0) {
        loads.push(store.dispatch('global/LOAD_ACADEMY'));
      }
      Promise.all(loads).then(
        () => next(),
        () => next(false)
      );
    }
  };
</script>
