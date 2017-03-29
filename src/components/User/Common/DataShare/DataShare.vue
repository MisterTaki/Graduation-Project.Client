<style scoped lang="scss" src="./DataShare.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">资料分享</h2>
        <el-button class="upload-btn" type="text" @click="dialog.upload=true">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
      </div>
      <h5 v-if="dataList.length === 0" class="notice">还没有人上传资料进行分享，点击右上角上传按钮进行资料分享吧：）</h5>
      <div v-else class="dataList-wrapper">
        <el-table class="data-list" :data="dataList" border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column prop="fileName" label="文件" align="center"></el-table-column>
          <el-table-column width="120" prop="fileSize" label="大小" align="center"></el-table-column>
          <el-table-column width="120" prop="shareName" label="分享者" align="center"></el-table-column>
          <el-table-column width="120" prop="shareTime" label="分享时间" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="downloadData(scope.$index, scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog class="upload-dialog" title="资料分享上传" size="small" v-model="dialog.upload">
        <el-upload ref="upload" class="upload dataShare-view--upload" action="//jsonplaceholder.typicode.com/posts/" drag :before-upload="beforeUpload" :on-success="submitSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">支持所有文件格式，但单个文件大小不超过10MB</div>
        </el-upload>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import { Message } from 'element-ui';

  export default {
    name: 'data-share',
    data () {
      return {
        dataList: [
          {
            fileName: '资料.doc',
            fileSize: '4.6MB',
            shareName: '高琦',
            shareTime: '2017-06-07',
            url: ''
          },
          {
            fileName: '资料.doc',
            fileSize: '4.6MB',
            shareName: '高琦',
            shareTime: '2017-06-07',
            url: ''
          }
        ],
        dialog: {
          upload: false
        }
      };
    },
    methods: {
      downloadData (index, row) {
        console.log(index);
        console.log(row);
      },
      beforeUpload (file) {
        const isLt5M = file.size / 1024 / 1024 < 10;
        if (!isLt5M) {
          Message.error('文件大小超过10MB');
        }
        return isLt5M;
      },
      submitSuccess (response, file) {
        console.log(file.name);
        Message.success('提交报告成功');
      }
    }
  };
</script>
