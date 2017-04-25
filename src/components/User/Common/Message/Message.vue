<style scoped lang="scss" src="./Message.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">所有通知：</h2>
      <div class="message-wrapper">
        <!-- <el-table class="notification-table" :data="notification" border>
          <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
          <el-table-column prop="content" label="内容" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="100" align="center"></el-table-column>
        </el-table> -->
        <el-table class="message-list message-view--table" :data="messageList" border>
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
          <el-table-column width="150" prop="author" label="发送者" align="center"></el-table-column>
          <el-table-column width="180" prop="created_at" label="发送时间" align="center"></el-table-column>
          <el-table-column width="100" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" size="small" @click="markNotice(scope.$index, scope.row)">标记为已读</el-button>
              <el-button type="text" size="small" @click="deleteNotice(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'message',
    data () {
      return {
        notification: [{
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }, {
          title: '毕设开始啦',
          content: '毕设将于大四下半学期开学正式开始',
          remark: ''
        }]
      };
    }
  };
</script>
