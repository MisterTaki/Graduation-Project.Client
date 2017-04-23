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
            <el-form-item label="学号">
              <el-input v-model="userInfo._id" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级">
              <el-input v-model="userInfo._class" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="学院">
              <el-input v-model="userInfo.academy" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="专业">
              <el-input v-model="userInfo.major" :readonly="true"></el-input>
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
      </el-form>
      <el-form class="form bound-form" label-position="top" :model="userInfo">
        <h2 class="form-title">绑定信息</h2>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="邮箱">
              <el-input class="edit-input" v-model="userInfo.email" :readonly="true"></el-input>
              <el-button type="text" class="edit-btn">修改<i class="el-icon-edit el-icon--right"></i></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机">
              <el-input v-model="userInfo.mobile" :readonly="true"></el-input>
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
              <el-button type="text" class="edit-btn" @click="openModifyPwdForm">修改<i class="el-icon-edit el-icon--right"></i></el-button>
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
          <el-button @click="submitModifyPwd" type="primary" class="submit-btn">提交</el-button>
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
          }
        },
        dialog: {
          modifyPwd: false
        }
      };
    },
    computed: mapState({
      identity: ({ auth }) => auth.identity,
      academyList: ({ global }) => global.academy,
      userInfo ({ user }) {
        const { info } = user;
        const { academyID, gender, ...otherInfo } = info;
        const academy = this.academyList[academyID - 1].value;
        return {
          gender: gender === 'm' ? '男' : '女',
          academy,
          ...otherInfo
        };
      }
    }),
    methods: {
      openModifyPwdForm () {
        this.dialog.modifyPwd = true;
        this.resetForm('modifyPwdForm');
      },
      submitModifyPwd () {
        const { oldPwd, newPwd } = this.modifyPwdForm;
        store.dispatch('user/MODIFY_PASSWORD', { oldPwd, newPwd }).then(() => {
          Message.success('修改成功');
          this.dialog.modifyPwd = false;
        }, () => false);
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
