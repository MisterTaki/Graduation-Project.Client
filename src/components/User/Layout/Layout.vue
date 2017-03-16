<template lang="html">
  <div class="main-container">
    <div class="fixed-header">
      <h1 class="logo-wrapper">
        <router-link to="/login" class="logo" title="毕业设计（论文）系统"></router-link>
      </h1>
      <div class="user-name-wrapper">
        <span class="user-name" title="高琦">高琦</span>
      </div>
      <div class="nav-wrapper">
        <router-link to="notification" class="nav-item notification" title="进入通知管理">
          <el-badge :value="1" :max="10" class="notification-badge"></el-badge>
          <div class="notification-wrapper">
            <h5 class="notification-title">通知</h5>
            <ul class="notification-list">
              <li class="notification-item">这是一条通知</li>
              <li class="notification-item">这是一条通知</li>
            </ul>
          </div>
        </router-link>
        <router-link to="settings" class="nav-item settings" title="进入个人设置"></router-link>
        <router-link to="/login" class="nav-item logout" title="注销"></router-link>
      </div>
    </div>
    <div class="fixed-menu">
      <router-link to="home" class="menu-item home active" title="主页">主页</router-link>
      <router-link to="my-teacher" class="menu-item my-teacher" title="我的导师">我的导师</router-link>
      <router-link to="my-students" class="menu-item my-students" title="我的学生">我的学生</router-link>
      <router-link to="report-submit" class="menu-item report-submit" title="提交报告">提交报告</router-link>
      <router-link to="report-review" class="menu-item report-review" title="报告审批">报告审批</router-link>
      <router-link to="data-share" class="menu-item data-share" title="资料分享">资料分享</router-link>
      <router-link to="time-schedule" class="menu-item time-schedule" title="时间安排">时间安排</router-link>
      <router-link to="publish-notice" class="menu-item publish-notice" title="发布公告">发布公告</router-link>
      <router-link to="account-manage" class="menu-item account-manage" title="账号管理">账号管理</router-link>
      <router-link to="system-settings" class="menu-item system-settings" title="系统设置">系统设置</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Badge } from 'element-ui';

  Vue.use(Badge);

  export default {
    name: 'user-view'
  };
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 960px;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  .logo-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
  .logo {
    display: block;
    width: 325px;
    height: 70px;
    background: url(../../assets/images/blue-logo_660x120.png) no-repeat center;
    background-size: auto 50px;
  }
  .user-name-wrapper {
    text-align: center;
  }
  .user-name {
    font-size: 22px;
    color: $blue;
    line-height: 70px;
    cursor: default;
  }
  .nav-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 10px;
    @include clearfloat;
  }
  .nav-item {
    position: relative;
    display: block;
    float: left;
    width: 60px;
    height: 70px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    &.notification:before {
      background: url(../../assets/images/icon-notification_26x26.png) no-repeat center;
    }
    &.notification:hover:before {
      background: url(../../assets/images/icon-notification--hover_26x26.png) no-repeat center;
    }
    &.settings:before {
      background: url(../../assets/images/icon-settings_26x26.png) no-repeat center;
    }
    &.settings:hover:before {
      background: url(../../assets/images/icon-settings--hover_26x26.png) no-repeat center;
    }
    &.logout:before {
      background: url(../../assets/images/icon-logout_26x26.png) no-repeat center;
    }
    &.logout:hover:before {
      background: url(../../assets/images/icon-logout--hover_26x26.png) no-repeat center;
    }
    .notification-badge {
      position: absolute;
      top: 10px;
      right: 6px;
    }
  }
  .nav-item.notification:hover .notification-wrapper {
    display: block;
  }
  .notification-wrapper {
    display: none;
    position: absolute;
    top: 70px;
    right: -60px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px 20px 10px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 1px 2px rgba(0,0,0,.1);
    &:after {
      display: block;
      position: absolute;
      top: -5px;
      right: 86px;
      content: "";
      width: 10px;
      height: 10px;
      box-shadow: -1px -1px 0 1px rgba(0,0,0,.05);
      background-color: #fff;
      transform: rotate(45deg);
    }
  }
  .notification-title {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
  .notification-list {
    padding: 5px 0;
  }
  .notification-item {
    padding: 5px 0;
    font-size: 12px;
    line-height: 24px;
    & + .notification-item {
      border-top: 1px solid rgba(0,0,0,.05);
    }
  }
  .fixed-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 70px;
    background-color: $blue;
    overflow-y: auto;
    z-index: 999;
  }
  .menu-item {
    position: relative;
    display: block;
    height: 75px;
    box-sizing: border-box;
    padding-top: 40px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    &:hover {
      background-color: $darkBlue;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
    }
    &.active {
      background-color: $darkBlue;
    }
    &.home:before {
      background: url(../../assets/images/icon-home_26x26.png) no-repeat center bottom;
    }
    &.time-schedule:before {
      background: url(../../assets/images/icon-schedule_26x26.png) no-repeat center bottom;
    }
    &.my-teacher:before {
      background: url(../../assets/images/icon-teacher_26x26.png) no-repeat center bottom;
    }
    &.my-students:before {
      background: url(../../assets/images/icon-students_26x26.png) no-repeat center bottom;
    }
    &.report-submit:before {
      background: url(../../assets/images/icon-submit_26x26.png) no-repeat center bottom;
    }
    &.report-review:before {
      background: url(../../assets/images/icon-review_26x26.png) no-repeat center bottom;
    }
    &.data-share:before {
      background: url(../../assets/images/icon-share_26x26.png) no-repeat center bottom;
    }
    &.publish-notice:before {
      background: url(../../assets/images/icon-publish_26x26.png) no-repeat center bottom;
    }
    &.account-manage:before {
      background: url(../../assets/images/icon-manage_26x26.png) no-repeat center bottom;
    }
    &.system-settings:before {
      background: url(../../assets/images/icon-system_26x26.png) no-repeat center bottom;
    }
  }
  .main-container {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding-top: 70px;
    margin-left: 100px;
    background-color: $background;
  }
</style>
