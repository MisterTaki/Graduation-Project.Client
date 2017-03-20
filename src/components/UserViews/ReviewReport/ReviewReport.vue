<style scoped lang="scss" src="./ReviewReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">报告审阅</h2>
      <div class="reportList-wrapper">
        <el-table class="report-list" :data="reportsData" stripe border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column width="120" prop="submitTime" label="提交时间" align="center"></el-table-column>
          <el-table-column width="120" prop="studentName" label="提交学生" align="center"></el-table-column>
          <el-table-column prop="fileName" label="提交的文件名称" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="downloadReport(scope.$index, scope.row)">下载</el-button>
              <el-button class="reply-btn" type="text" size="small" @click="replyReport(scope.$index, scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'review-report',
    data () {
      return {
        reportsData: [
          {
            submitTime: '2017-06-07',
            studentName: '高琦',
            fileName: '任务书'
          },
          {
            submitTime: '2017-06-07',
            studentName: '高琦',
            fileName: '任务书'
          },
          {
            submitTime: '2017-06-07',
            studentName: '高琦',
            fileName: '任务书'
          },
        ]
      };
    },
    // methods : {
    //   downloadReport (index, row) {
    //
    //   },
    //   replyReport (index, row) {
    //
    //   }
    // }
  };
</script>
