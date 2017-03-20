<style scoped lang="scss" src="./User.scss"></style>

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
        <router-link to="user-settings" class="nav-item settings" title="进入个人设置"></router-link>
        <router-link to="/login" class="nav-item logout" title="注销"></router-link>
      </div>
    </div>
    <div class="fixed-menu">
      <router-link to="home" class="menu-item home" :class="{ active: currentView === 'home' }" title="主页">主页</router-link>
      <router-link to="my-teacher" class="menu-item my-teacher" :class="{ active: currentView === 'my-teacher' }" title="我的导师">我的导师</router-link>
      <router-link to="my-students" class="menu-item my-students" :class="{ active: currentView === 'my-students' }" title="我的学生">我的学生</router-link>
      <router-link to="submit-report" class="menu-item report-submit" :class="{ active: currentView === 'submit-report' }" title="提交报告">提交报告</router-link>
      <router-link to="review-report" class="menu-item report-review" :class="{ active: currentView === 'review-report' }" title="报告审批">报告审批</router-link>
      <router-link to="data-share" class="menu-item data-share" :class="{ active: currentView === 'data-share' }" title="资料分享">资料分享</router-link>
      <router-link to="reply-schedule" class="menu-item time-schedule" :class="{ active: currentView === 'reply-schedule' }" title="答辩安排">答辩安排</router-link>
      <router-link to="publish-notice" class="menu-item publish-notice" :class="{ active: currentView === 'publish-notice' }" title="发布公告">发布公告</router-link>
      <router-link to="account-manage" class="menu-item account-manage" :class="{ active: currentView === 'account-manage' }" title="账号管理">账号管理</router-link>
      <router-link to="system-settings" class="menu-item system-settings" :class="{ active: currentView === 'system-settings' }" title="系统设置">系统设置</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'user-view',
    data () {
      return {
        currentView: this.$route.name
      };
    },
    watch: {
      $route (to) {
        this.currentView = to.name;
      }
    }
  };
</script>
