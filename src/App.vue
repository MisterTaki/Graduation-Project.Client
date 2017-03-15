<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  @import './styles/reset';
  #app {
    min-width: 960px;
    height: 100%;
  }
</style>
