<style scoped lang="scss" src="./DataShare.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">资料分享</h2>
        <el-button v-if="systemStatus !== 1" class="upload-btn" type="text" @click="dialog.upload=true">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
      </div>
      <template v-if="systemStatus !== 1">
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
          <el-upload ref="upload" class="upload dataShare-view--upload" action="/api/v1/resource/upload" drag :before-upload="beforeUpload" :on-success="submitSuccess" :headers="token" :data="uploadData">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">支持所有文件格式，但单个文件大小不超过10MB</div>
          </el-upload>
        </el-dialog>
      </template>
      <template v-else>
        <h5 class="notice">抱歉：现在还是学生、导师双向选择阶段，无法分享资料：）</h5>
      </template>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'data-share',
    mixins: [mixins],
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
        },
        uploadData: {
          resourceName: '',
          resourceSize: ''
        },
        systemStatus: 2
      };
    },
    computed: mapState({
      token: ({ auth }) => ({
        Authorization: auth.token
      }),
      // systemStatus: ({ system }) => system.status.value,
    }),
    methods: {
      downloadData (index, row) {
        console.log(index);
        console.log(row);
      },
      beforeUpload (file) {
        const isLt5M = file.size / 1024 / 1024 < 10;
        if (!isLt5M) {
          Message.error('文件大小超过10MB');
          return false;
        }
        this.uploadData.resourceName = file.name;
        this.uploadData.resourceSize = `${(file.size / 1024 / 1024).toFixed(2)}.MB`;
        return true;
      },
      submitSuccess (response, file) {
        console.log(file.name);
        Message.success('提交报告成功');
      }
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.system.status.loaded) loads.push(store.dispatch('system/GET_STATUS'));
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
