<template lang="html">
  <div class="fixed-menu">
    <router-link to="home" class="menu-item home active" title="主页">主页</router-link>
    <router-link to="my-teacher" class="menu-item my-teacher" title="我的导师">我的导师</router-link>
    <router-link to="my-students" class="menu-item my-students" title="我的学生">我的学生</router-link>
    <router-link to="report-submit" class="menu-item report-submit" title="提交报告">提交报告</router-link>
    <router-link to="report-review" class="menu-item report-review" title="报告审批">报告审批</router-link>
    <router-link to="data-share" class="menu-item data-share" title="资料分享">资料分享</router-link>
    <router-link to="time-schedule" class="menu-item time-schedule" title="时间安排">时间安排</router-link>
    <router-link to="publish-notice" class="menu-item publish-notice" title="账号管理">发布公告</router-link>
    <router-link to="account-manage" class="menu-item account-manage" title="账号管理">账号管理</router-link>
    <router-link to="system-settings" class="menu-item system-settings" title="账号管理">系统设置</router-link>
  </div>
</template>

<script>
  export default {
    name: 'fixed-menu'
  };
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  @import "../styles/mixin";
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
      background: url(../assets/images/icon-home_26x26.png) no-repeat center bottom;
    }
    &.time-schedule:before {
      background: url(../assets/images/icon-schedule_26x26.png) no-repeat center bottom;
    }
    &.my-teacher:before {
      background: url(../assets/images/icon-teacher_26x26.png) no-repeat center bottom;
    }
    &.my-students:before {
      background: url(../assets/images/icon-students_26x26.png) no-repeat center bottom;
    }
    &.report-submit:before {
      background: url(../assets/images/icon-submit_26x26.png) no-repeat center bottom;
    }
    &.report-review:before {
      background: url(../assets/images/icon-review_26x26.png) no-repeat center bottom;
    }
    &.data-share:before {
      background: url(../assets/images/icon-share_26x26.png) no-repeat center bottom;
    }
    &.publish-notice:before {
      background: url(../assets/images/icon-publish_26x26.png) no-repeat center bottom;
    }
    &.account-manage:before {
      background: url(../assets/images/icon-manage_26x26.png) no-repeat center bottom;
    }
    &.system-settings:before {
      background: url(../assets/images/icon-system_26x26.png) no-repeat center bottom;
    }
  }
</style>
