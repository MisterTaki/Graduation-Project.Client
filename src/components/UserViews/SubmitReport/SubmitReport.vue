<style scoped lang="scss" src="./SubmitReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">提交报告</h2>
        <el-button class="upload-btn" type="text" @click="dialog.studentList=true">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
      </div>
      <h5 class="notice">同学你好，现在是提交"{{notice[status]}}"环节，请点击右上角上传按钮进行提交</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'submit-report',
    data () {
      return {
        status: 0,
        notice: [
          '任务书',
          '选题报告',
          '中期报告',
          '最终毕业设计（论文）'
        ]
      };
    }
  };
</script>
