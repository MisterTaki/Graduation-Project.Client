<style scoped lang="scss" src="./User.scss"></style>

<template lang="html">
  <div class="main-container">
    <fixed-header :userName="userName"></fixed-header>
    <fixed-menu :currentView="currentView" :identity="identity"></fixed-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Common } from '@/components';

  export default {
    name: 'user-view',
    components: {
      'fixed-header': Common.FixedHeader,
      'fixed-menu': Common.FixedMenu,
    },
    data () {
      return {
        userName: '高琦',
        identity: this.$route.params.identity,
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
