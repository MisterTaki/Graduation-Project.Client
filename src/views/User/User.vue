<style scoped lang="scss" src="./User.scss"></style>

<template lang="html">
  <div class="main-container">
    <fixed-header></fixed-header>
    <fixed-menu></fixed-menu>
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
    }
  };
</script>
