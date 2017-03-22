<style scoped lang="scss" src="./PublishNotice.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">发布公告</h2>
        <el-button class="publish-btn" type="text" @click="dialog.publish=true">发布<i class="el-icon-edit el-icon--right"></i></el-button>
      </div>
      <h5 v-if="noticesData.length === 0" class="notice">还没有发布过公告，点击右上角发布按钮进行公告发布吧：）</h5>
      <div v-else class="noticeList-wrapper">
        <el-table class="notice-list" :data="noticesData" stripe border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column prop="noticeTitle" label="标题" align="center"></el-table-column>
          <el-table-column prop="noticeContent" label="内容" align="center"></el-table-column>
          <el-table-column width="120" prop="noticeRemark" label="备注" align="center"></el-table-column>
          <el-table-column width="120" prop="publishAuthor" label="发布者" align="center"></el-table-column>
          <el-table-column width="120" prop="publishTime" label="发布时间" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="deleteNotice(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog class="editNotice-dialog" title="发布公告编辑" size="small" v-model="dialog.editNotice">

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

  export default {
    name: 'publish-notice',
    data () {
      return {
        noticesData: [
          {
            noticeTitle: '通知1',
            noticeContent: '的撒都是的是等待是导师第三代是导师的搜索',
            noticeRemark: '倒萨大厦大大说的',
            publishAuthor: '系统管理员',
            publishTime: '2017-07-06'
          }
        ],
        dialog: {
          editNotice: false
        }
      };
    },
    methods: {
      deleteNotice (index, row) {
        console.log(index);
        console.log(row);
      },
      submitNotice () {
        Message.success('发布公告成功');
      }
    }
  };
</script>
