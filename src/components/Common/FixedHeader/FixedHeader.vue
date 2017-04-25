<style scoped lang="scss" src="./FixedHeader.scss"></style>

<template lang="html">
  <div class="fixed-header">
    <h1 class="logo-wrapper">
      <i class="logo" title="毕业设计（论文）系统"></i>
    </h1>
    <div class="user-name-wrapper">
      <span class="user-name" :title="username">{{username}}</span>
    </div>
    <div class="nav-wrapper">
      <router-link to="message" class="nav-item message" title="进入私信中心">
        <el-badge :value="1" :max="10" class="message-badge"></el-badge>
        <div class="message-wrapper">
          <h5 class="message-title">私信</h5>
          <ul class="message-list">
            <li class="message-item">这是一条私信</li>
            <li class="message-item">这是一条私信</li>
          </ul>
        </div>
      </router-link>
      <router-link to="user-settings" class="nav-item settings" title="进入个人设置"></router-link>
      <div @click="logout" class="nav-item logout" title="注销"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import router from '@/router';

  export default {
    name: 'fixed-header',
    computed: mapState({
      username: ({ auth }) => auth.username
    }),
    methods: {
      logout () {
        this.$store.dispatch('auth/LOGOUT').then(() => {
          Message.success('注销成功');
          router.push('/login');
        }, () => Message.error('注销失败'));
      }
    }
  };
</script>
