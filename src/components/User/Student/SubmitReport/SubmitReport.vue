<style scoped lang="scss" src="./SubmitReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="submit-wrapper">
        <div class="title-wrapper">
          <h2 class="title">提交报告</h2>
          <el-button v-if="systemStatus !== 1" class="upload-btn" type="text" @click="dialog.upload=true">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
        </div>
        <h5 class="notice">同学你好，现在是“{{noticeText}}”环节，{{systemStatus !== 1 ? '请点击右上角上传按钮进行提交：）' : '暂时无法提交报告'}}</h5>
        <template v-if="dialog.upload">
          <el-dialog class="upload-dialog" title="报告上传提交" size="small" v-model="dialog.upload" @close="$refs.upload.clearFiles()" :close-on-click-modal=false>
            <el-upload ref="upload" class="upload submitReport-view--upload" :action="uploadAction" drag :before-upload="beforeUpload" :on-success="submitSuccess" :headers="headers" :data="uploadData">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过5MB</div>
            </el-upload>
          </el-dialog>
        </template>
      </div>
      <div v-if="systemStatus !== 1" class="record-wrapper">
        <h2 class="title">提交记录</h2>
        <div class="recordList-wrapper">
          <el-table class="record-list" :data="reports" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column width="180" prop="created_at" label="提交时间" align="center"></el-table-column>
            <el-table-column prop="reportName" label="提交的文件名称" align="center"></el-table-column>
            <el-table-column width="120" prop="reportSize" label="大小" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store';
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import { report as reportAPI } from '@/api';
  import config from '@/config';

  export default {
    name: 'submit-report',
    data () {
      return {
        uploadAction: `${config.baseURL}${reportAPI.upload}`,
        uploadData: {
          reportSize: '',
          reporName: ''
        },
        dialog: {
          upload: false
        }
      };
    },
    computed: mapState({
      headers: ({ auth }) => ({
        Authorization: auth.token
      }),
      systemStatus: ({ system }) => system.status.value,
      reports: ({ report }) => report.data.value,
      noticeText () {
        const noticeTexts = [
          '与导师双向选择',
          '任务书',
          '选题报告',
          '中期报告',
          '最终毕业设计（论文）'
        ];
        return noticeTexts[this.systemStatus - 1];
      }
    }),
    methods: {
      beforeUpload (file) {
        const extension = file.name.slice(file.name.lastIndexOf('.'));
        const isDocument = extension === '.doc' || extension === '.docx';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isDocument) {
          Message.closeAll();
          Message.error('文件格式错误');
          return false;
        }
        if (!isLt5M) {
          Message.closeAll();
          Message.error('文件大小超过5MB');
          return false;
        }
        this.uploadData.reportName = file.name;
        this.uploadData.reportSize = `${(file.size / 1024 / 1024).toFixed(2)}.MB`;
        return true;
      },
      submitSuccess (response, file) {
        Message.closeAll();
        Message.success(`提交报告"${file.name}"成功`);
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.system.status.loaded) {
        return store.dispatch('system/GET_STATUS')
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
