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
        <el-badge :value="badgeLen" :max="10" class="message-badge"></el-badge>
        <template v-if="badgeLen > 0">
          <div class="message-wrapper">
            <h5 class="message-title">未读私信{{isMore ? '（最新10条）': ''}}</h5>
            <ul class="message-list">
              <li class="message-item" v-for="(item, index) in latestMessages" :key="index">{{item.title}}</li>
            </ul>
          </div>
        </template>
      </router-link>
      <router-link to="user-settings" class="nav-item settings" title="进入个人设置"></router-link>
      <div @click="logout" class="nav-item logout" title="注销"></div>
    </div>
  </div>
</template>

<script>
  import store from '@/store';
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import router from '@/router';

  export default {
    name: 'fixed-header',
    data () {
      return {
      };
    },
    computed: mapState({
      username: ({ auth }) => auth.username,
      latestMessages ({ message }) {
        const messages = message.latest.value;
        if (messages.length > 10) {
          return messages.slice(0, 10);
        }
        return messages;
      },
      badgeLen () {
        return this.latestMessages.length;
      },
      isMore () {
        return this.badgeLen > 10;
      }
    }),
    methods: {
      logout () {
        this.$store.dispatch('auth/LOGOUT').then(() => {
          Message.closeAll();
          Message.success('注销成功');
          router.push('/login');
        }, () => Message.error('注销失败'));
      }
    },
    created () {
      if (!store.state.message.latest.loaded) {
        store.dispatch('message/LOAD_LATEST');
      }
    }
  };
</script>
