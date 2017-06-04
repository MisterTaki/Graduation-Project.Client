<style scoped lang="scss" src="./FixedMenu.scss"></style>

<template lang="html">
  <div class="fixed-menu">
    <router-link to="home" class="menu-item home" title="主页">主页</router-link>
    <template v-if="identity === 'student'">
      <router-link to="my-teacher" class="menu-item my-teacher" title="我的导师">我的导师</router-link>
      <router-link to="submit-report" class="menu-item report-submit" title="提交报告">提交报告</router-link>
      <router-link to="data-share" class="menu-item data-share" title="资料分享">资料分享</router-link>
    </template>
    <template v-else-if="identity === 'teacher'">
      <router-link to="my-students" class="menu-item my-students" title="我的学生">我的学生</router-link>
      <router-link to="review-report" class="menu-item report-review" title="报告审批">报告审批</router-link>
      <router-link to="data-share" class="menu-item data-share" title="资料分享">资料分享</router-link>
    </template>
    <template v-else-if="identity === 'admin'">
      <!-- <router-link to="reply-schedule" class="menu-item time-schedule" title="答辩安排">答辩安排</router-link> -->
      <router-link to="publish-notice" class="menu-item publish-notice" title="发布公告">发布公告</router-link>
      <router-link to="account-manage" class="menu-item account-manage" title="账号管理">账号管理</router-link>
      <router-link to="system-settings" class="menu-item system-settings" title="系统设置">系统设置</router-link>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'fixed-menu',
    computed: mapState({
      identity: ({ auth }) => auth.identity
    }),
  };
</script>
