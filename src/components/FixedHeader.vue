<template lang="html">
  <div class="fixed-header">
    <h1 class="logo-wrapper">
      <router-link to="/login" class="logo" title="毕业设计（论文）系统"></router-link>
    </h1>
    <div class="user-name-wrapper">
      <span class="user-name" title="高琦">高琦</span>
    </div>
    <div class="nav-wrapper">
      <router-link to="notification" class="nav-item notification">
        <el-badge :value="1" :max="10" class="notification-badge"></el-badge>
        <div class="notification-wrapper">
          <h5 class="notification-title">通知</h5>
          <ul class="notification-list">
            <li class="notification-item">这是一条通知</li>
            <li class="notification-item">这是一条通知</li>
          </ul>
        </div>
      </router-link>
      <router-link to="settings" class="nav-item settings" title="个人设置"></router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Badge } from 'element-ui';

  Vue.use(Badge);

  export default {
    name: 'fixed-header',
  };
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  @import "../styles/mixin";
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
    background: url(../assets/images/blue-logo_660x120.png) no-repeat center;
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
      background: url(../assets/images/icon-notification_26x26.png) no-repeat center;
    }
    &.notification:hover:before {
      background: url(../assets/images/icon-notification--hover_26x26.png) no-repeat center;
    }
    &.settings:before {
      background: url(../assets/images/icon-settings_26x26.png) no-repeat center;
    }
    &.settings:hover:before {
      background: url(../assets/images/icon-settings--hover_26x26.png) no-repeat center;
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
</style>
