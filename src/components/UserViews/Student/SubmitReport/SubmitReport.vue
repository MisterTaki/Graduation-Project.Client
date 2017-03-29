<style scoped lang="scss" src="./SubmitReport.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="submit-wrapper">
        <div class="title-wrapper">
          <h2 class="title">提交报告</h2>
          <el-button class="upload-btn" type="text" @click="dialog.upload=true">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
        </div>
        <h5 class="notice">同学你好，现在是提交“{{notice[status]}}”环节，请点击右上角上传按钮进行提交：）</h5>
        <el-dialog class="upload-dialog" title="报告上传提交" size="small" v-model="dialog.upload">
          <el-upload ref="upload" class="upload submitReport-view--upload" action="//jsonplaceholder.typicode.com/posts/" drag :before-upload="beforeUpload" :on-success="submitSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过5MB</div>
          </el-upload>
        </el-dialog>
      </div>
      <div class="record-wrapper">
        <h2 class="title">提交记录</h2>
        <div class="recordList-wrapper">
          <el-table class="record-list" :data="recordsData" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column width="120" prop="time" label="提交时间" align="center"></el-table-column>
            <el-table-column prop="name" label="提交的文件名称" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

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
        ],
        recordsData: [
          {
            time: '2016-06-06',
            name: '任务书'
          },
          {
            time: '2016-07-07',
            name: '选题报告'
          },
        ],
        dialog: {
          upload: false
        }
      };
    },
    methods: {
      beforeUpload (file) {
        const extension = file.name.slice(file.name.lastIndexOf('.'));
        const isDocument = extension === '.doc' || extension === '.docx';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isDocument) {
          Message.error('文件格式错误');
        }
        if (!isLt5M) {
          Message.error('文件大小超过5MB');
        }
        return isDocument && isLt5M;
      },
      submitSuccess (response, file) {
        console.log(file.name);
        Message.success('提交报告成功');
      }
    }
  };
</script>
