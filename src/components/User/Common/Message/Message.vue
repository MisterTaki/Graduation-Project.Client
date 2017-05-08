<style scoped lang="scss" src="./Message.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <el-button class="editMessage-btn" type="text" @click="openEditDialog('send')">发送私信<i class="el-icon-fa-pencil el-icon--right"></i></el-button>
      <el-tabs class="tabs accountManage-view--tabs" value="receive-box" type="card">
        <el-tab-pane label="收件箱" name="receive-box">
          <el-table class="message-list message-view--table" :data="receiveMessages" border>
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" label-width="80px">
                  <el-form-item label="内容：">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                  <template v-if="props.row.remark !== ''">
                    <el-form-item label="备注：">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column width="150" prop="senderName" label="发件人" align="center"></el-table-column>
            <el-table-column width="180" prop="created_at" label="发送时间" align="center"></el-table-column>
            <el-table-column width="160" label="操作" align="center">
              <template scope="scope">
                <el-button class="reply-btn" type="text" size="small" @click="replyMessage(scope.$index, scope.row)">回复</el-button>
                <el-button class="delete-btn" type="text" size="small" @click="deleteMessage(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="发件箱" name="send-box">
          <el-table class="message-list message-view--table" :data="sendMessages" border>
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" label-width="80px">
                  <el-form-item label="内容：">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                  <template v-if="props.row.remark !== ''">
                    <el-form-item label="备注：">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column width="150" prop="receiverName" label="收件人" align="center"></el-table-column>
            <el-table-column width="180" prop="created_at" label="发送时间" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="垃圾箱" name="garbage-box">
          <el-table class="message-list message-view--table" :data="deletedMessages" border>
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" label-width="80px">
                  <el-form-item label="内容：">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                  <template v-if="props.row.remark !== ''">
                    <el-form-item label="备注：">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column width="150" prop="senderName" label="发件人" align="center"></el-table-column>
            <el-table-column width="180" prop="created_at" label="发送时间" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog class="editNotice-dialog" title="编辑" size="small" :close-on-click-modal=false v-model="dialog.edit">
      <el-form :model="basicForm" :rules="rules.basicForm" ref="basicForm" label-width="100px" class="notice-form">
        <el-form-item label="收件人" prop="receiveIndex">
          <template v-if="dialogEditType === 'send'">
            <el-select class="receive-select" v-model="basicForm.receiveIndex" placeholder="请选择">
              <el-option
                v-for="(item, index) in receiveOptions"
                :label="item.username"
                :key="item._id"
                :value="index">
              </el-option>
            </el-select>
          </template>
          <template v-else-if="dialogEditType === 'reply'">
            <el-input v-model="basicForm.receiveName" :readonly='true'></el-input>
          </template>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="basicForm.title" :readonly='dialogEditType === "reply"'></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="basicForm.content"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="basicForm.remark"></el-input>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" @click.prevent="submitSendMessage" nativeType="submit" :loading="loading" :disabled="loading">确定</el-button>
          <el-button @click="dialog.edit=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message, MessageBox } from 'element-ui';
  import store from '@/store';
  import mixins from '@/mixins';

  export default {
    name: 'message',
    mixins: [mixins],
    data () {
      return {
        dialog: {
          edit: false
        },
        dialogEditType: '',
        basicForm: {
          receiveName: '',
          receiveIndex: '',
          title: '',
          content: '',
          remark: ''
        },
        rules: {
          basicForm: {
            receiveIndex: [
              { required: true, message: '请选择收件人' }
            ],
            title: [
              { required: true, message: '请输入标题', trigger: 'blur' }
            ],
            content: [
              { required: true, message: '请输入内容', trigger: 'blur' }
            ],
          }
        },
        receiveOptions: [
          {
            username: '王昭顺',
            _id: 'T12345',
            identity: 'teacher'
          },
          {
            username: '超级管理员',
            _id: 'A12345',
            identity: 'admin'
          },
          {
            username: '高琦',
            _id: '41355025',
            identity: 'student'
          },
        ]
      };
    },
    computed: mapState({
      loading: ({ global }) => global.loading,
      receiveMessages: ({ message }) => message.receive.value,
      sendMessages: ({ message }) => message.send.value,
      deletedMessages: ({ message }) => message.deleted.value,
      messageForm () {
        const { _id: receiverID, username: receiverName, identity: receiverIdentity } = this.receiveOptions[this.basicForm.receiveIndex];
        const { receiveIndex, ...basicInfo } = this.basicForm;
        return {
          ...basicInfo,
          receiverID,
          receiverName,
          receiverIdentity
        };
      }
    }),
    methods: {
      openEditDialog (type, receiveData) {
        this.dialogEditType = type;
        this.resetForm('basicForm');
        if (type === 'reply') {
          this.basicForm.receiveName = receiveData.name;
          this.basicForm.receiveIndex = receiveData.index;
          this.basicForm.title = receiveData.title;
        }
        this.dialog.edit = true;
      },
      replyMessage (index, row) {
        const { senderID, title } = row;
        for (let i = 0; i < this.receiveOptions.length; i += 1) {
          if (this.receiveOptions[i]._id === senderID) {
            const receiveData = {
              index: i,
              name: this.receiveOptions[i].username,
              title: `回复: "${title}"`
            };
            this.openEditDialog('reply', receiveData);
            return;
          }
        }
      },
      deleteMessage (index, row) {
        MessageBox.confirm('此操作将删除该私信移至垃圾箱, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const { _id: messageID } = row;
          store.dispatch('message/DELETE', { data: { messageID }, index })
            .then(() => {
              Message.success('删除成功');
            })
            .catch(() => false);
        }).catch(() => {
          Message.info('已取消');
        });
      },
      submitSendMessage () {
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            return store.dispatch('message/SEND', this.messageForm)
              .then(() => {
                Message.success('操作成功');
                this.dialog.edit = false;
              })
              .catch(() => false);
          }
          return this.showInvalidateMsg();
        });
      }
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.message.receive.loaded) loads.push(store.dispatch('message/LOAD_RECEIVE'));
      if (!store.state.message.send.loaded) loads.push(store.dispatch('message/LOAD_SEND'));
      if (!store.state.message.deleted.loaded) loads.push(store.dispatch('message/LOAD_DELETED'));
      if (loads.length > 0) {
        return Promise.all(loads)
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
