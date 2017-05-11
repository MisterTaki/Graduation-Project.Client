<style scoped lang="scss" src="./ReviewReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">报告审阅</h2>
      <template v-if="systemStatus !== 1">
        <div class="reportList-wrapper">
          <el-table class="report-list" :data="reports" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column width="180" prop="created_at" label="提交时间" align="center"></el-table-column>
            <el-table-column width="120" prop="studentName" label="提交学生" align="center"></el-table-column>
            <el-table-column prop="reportName" label="提交的文件名称" align="center"></el-table-column>
            <el-table-column width="100" label="操作" align="center">
              <template scope="scope">
                <el-button type="text" size="small" @click="downloadReport(scope.row)">下载</el-button>
                <el-button class="reply-btn" type="text" size="small" @click="showReplyDialog(scope.$index, scope.row)">回复</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template v-else>
        <h5 class="notice">抱歉：现在还是学生、导师双向选择阶段，无法审阅报告：）</h5>
      </template>
    </div>
    <el-dialog class="reply-dialog" title="审阅回复" size="small" v-model="dialog.reply" @close="resetForm('replyForm')">
      <el-form :model="replyForm" :rules="rules.replyForm" ref="replyForm" label-width="100px" class="notice-form">
        <el-form-item label="回复学生" prop="receiveIndex">
          <el-input v-model="replyForm.receiverName" :readonly='true'></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="replyForm.title" :readonly='true'></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="replyForm.content"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="replyForm.remark"></el-input>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" @click.prevent="submitReply" nativeType="submit" :loading="loading" :disabled="loading">确定</el-button>
          <el-button @click="dialog.edit=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import store from '@/store';
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import mixins from '@/mixins';
  import { report as reportAPI } from '@/api';
  import config from '@/config';

  export default {
    name: 'review-report',
    mixins: [mixins],
    data () {
      return {
        dialog: {
          reply: false
        },
        replyForm: {
          receiverID: '',
          receiverName: '',
          receiverIdentity: 'student',
          title: '',
          content: '',
          remark: ''
        },
        rules: {
          replyForm: {
            content: [
              { required: true, message: '请输入内容', trigger: 'blur' }
            ],
          }
        }
      };
    },
    computed: mapState({
      token: ({ auth }) => auth.token,
      systemStatus: ({ system }) => system.status.value,
      reports: ({ report }) => report.data.value
    }),
    methods: {
      downloadReport (row) {
        window.open(`${config.baseURL}${reportAPI.download}?token=${this.token}&_id=${row._id}`);
      },
      showReplyDialog (index, row) {
        this.replyForm.receiverName = row.studentName;
        this.replyForm.receiverID = row.studentID;
        this.replyForm.title = `回复：${row.reportName}`;
        this.dialog.reply = true;
      },
      submitReply () {
        this.$refs.replyForm.validate((valid) => {
          if (valid) {
            return store.dispatch('message/SEND', this.replyForm)
              .then(() => {
                Message.success('回复成功');
                this.dialog.reply = false;
              })
              .catch(() => false);
          }
          return this.showInvalidateMsg();
        });
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.system.status.loaded) {
        return store.dispatch('system/LOAD')
          .then(() => {
            if (store.state.system.status.value !== 1) {
              return store.dispatch('report/LOAD')
                .then(() => next())
                .catch(() => next(false));
            }
            return next();
          })
          .catch(() => next(false));
      }
      if (store.state.system.status.value !== 1) {
        return store.dispatch('report/LOAD')
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
