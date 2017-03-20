<style scoped lang="scss" src="./Notification.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">所有通知：</h2>
      <div class="notification-wrapper">
        <el-table class="notification-table" :data="notification" stripe border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
          <el-table-column prop="content" label="内容" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="100" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notification',
    data () {
      return {
        notification: [{
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }]
      };
    }
  };
</script>
