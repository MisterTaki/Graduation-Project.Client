<style scoped lang="scss" src="./PublishNotice.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <div class="title-wrapper">
        <h2 class="title">发布公告</h2>
        <el-button class="publish-btn" type="text" @click="dialog.editNotice=true">发布<i class="el-icon-edit el-icon--right"></i></el-button>
      </div>
      <h5 v-if="noticesData.length === 0" class="notice">还没有发布过公告，点击右上角发布按钮进行公告发布吧：）</h5>
      <div v-else class="noticeList-wrapper">
        <el-table class="notice-list publishNotice-view--table" :data="noticesData" border>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" label-width="80px">
                <el-form-item label="内容：">
                  <span>{{ props.row.content }}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column width="150" prop="author" label="发布者" align="center"></el-table-column>
          <el-table-column width="150" prop="time" label="发布时间" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="deleteNotice(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog class="editNotice-dialog" title="发布公告编辑" size="small" :close-on-click-modal=false v-model="dialog.editNotice" @close="resetForm('noticeForm')">
        <el-form :model="noticeForm" :rules="rules.noticeForm" ref="noticeForm" label-width="100px" class="notice-form">
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="noticeForm.title"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="noticeForm.content"></el-input>
          </el-form-item>
          <el-form-item label="公告备注" prop="remark">
            <el-input v-model="noticeForm.remark"></el-input>
          </el-form-item>
          <div class="btn-group">
            <el-button type="primary" @click.prevent="submitPublishNotice" nativeType="submit" :loading="loading" :disabled="loading">立即发布</el-button>
            <el-button @click="dialog.editNotice=false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'publish-notice',
    mixins: [mixins],
    data () {
      return {
        noticesData: [
          {
            title: '通知1',
            content: '的撒都是的是等待是导师第三代是导师的搜索',
            remark: '倒萨大厦大大说的',
            author: '系统管理员',
            time: '2017-07-06'
          },
          {
            title: '通知2',
            content: '的撒都是的是等待是导师第三代是导师的搜索',
            remark: '倒萨大厦大大说的',
            author: '系统管理员',
            time: '2017-07-06'
          },
        ],
        dialog: {
          editNotice: false
        },
        noticeForm: {
          title: '',
          content: '',
          remark: ''
        },
        rules: {
          noticeForm: {
            title: [
              { required: true, message: '请输入标题', trigger: 'blur' }
            ],
            content: [
              { required: true, message: '请输入内容', trigger: 'blur' }
            ],
          }
        }
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading
    }),
    methods: {
      deleteNotice (index, row) {
        console.log(index);
        console.log(row);
      },
      submitPublishNotice () {
        this.$refs.noticeForm.validate((valid) => {
          if (valid) {
            return store.dispatch('notice/PUBLISH', this.noticeForm).then(() => {
              Message.success('发布公告成功');
              this.dialog.editNotice = false;
            }, () => false);
          }
          return Message.error('请填写按要求填写');
        });
      }
    }
  };
</script>
