<style scoped lang="scss" src="./ReviewReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">报告审阅</h2>
      <div class="reportList-wrapper">
        <el-table class="report-list" :data="reportsData" border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column width="120" prop="submitTime" label="提交时间" align="center"></el-table-column>
          <el-table-column width="120" prop="studentName" label="提交学生" align="center"></el-table-column>
          <el-table-column prop="fileName" label="提交的文件名称" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="downloadReport(scope.$index, scope.row)">下载</el-button>
              <el-button class="reply-btn" type="text" size="small" @click="showReplyDialog(scope.$index, scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog class="reply-dialog" title="审阅回复" size="small" v-model="dialog.reply" @close="resetForm('replyForm')">
      <h5 class="reply-title">学生姓名：<span>{{currentTarget.studentName}}</span></h5>
      <h5 class="reply-title">文件名称：<span>{{currentTarget.fileName}}</span></h5>
      <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入回复内容" v-model="replyForm.content">
      </el-input>
      <div class="btn-group">
        <el-button @click="dialog.reply=false">取消</el-button>
        <el-button type="primary" @click="submitReply">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  import mixins from '@/mixins';

  export default {
    name: 'review-report',
    mixins: [mixins],
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
        ],
        currentTarget: {},
        dialog: {
          reply: false
        },
        replyForm: {
          content: ''
        }
      };
    },
    methods: {
      downloadReport (index, row) {
        console.log(index);
        console.log(row);
      },
      showReplyDialog (index, row) {
        this.currentTarget = row;
        this.dialog.reply = true;
      },
      submitReply () {
        Message.success('提交成功');
        this.dialog.reply = false;
      }
    }
  };
</script>
