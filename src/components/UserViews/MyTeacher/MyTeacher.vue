<style scoped lang="scss" src="./MyTeacher.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">我的导师：</h2>
      <div class="myTeacher-wrapper">
        <template v-if="status===0">
          <div class="status">
            <h5 class="notice">还没有选择导师，点击右下角的“开始选择导师”来开始：）</h5>
            <router-link to="choose-teacher" class="choose-btn">开始选择导师</router-link>
          </div>
        </template>
        <template v-else-if="status===1">
          <div class="status">
            <h5 class="notice">已提交导师志愿名单，请耐心等待导师选择确认：）</h5>
            <el-button class="start-btn" type="text" @click="volunteerListDialog=true">查看已选择志愿</el-button>
          </div>
          <el-dialog class="volunteerList-dialog" title="已选择志愿" size="large" v-model="volunteerListDialog">
            <el-table class="my-volunteer" :data="myVolunteer" stripe border>
              <el-table-column width="100" type="index" label="志愿次序" align="center"></el-table-column>
              <el-table-column width="140" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column width="200" prop="academy" label="学院" align="center"></el-table-column>
              <el-table-column width="250" prop="email" label="邮箱" align="center"></el-table-column>
              <el-table-column width="150" prop="mobile" label="手机" align="center"></el-table-column>
              <el-table-column prop="topic" label="研究课题" align="center"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
        <template v-else-if="status===2">
          <div class="status">
            <el-table class="myTeacher-table" :data="myTeacher" stripe border>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="academy" label="学院" align="center"></el-table-column>
              <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
              <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
              <el-table-column prop="topic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Button, Table, TableColumn, Dialog } from 'element-ui';

  Vue.use(Button);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Dialog);

  export default {
    name: 'my-teacher',
    data () {
      return {
        status: 0, // 0:未选择导师，1:等待导师回复中，2:已选择完成
        volunteerListDialog: false,
        myVolunteer: [{
          name: '王昭顺',
          academy: '计算机与通信工程',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          topic: '毕业设计（论文）管理系统'
        }, {
          name: '王昭顺',
          academy: '计算机与通信工程',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          topic: '毕业设计（论文）管理系统'
        }, {
          name: '王昭顺',
          academy: '计算机与通信工程',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          topic: '毕业设计（论文）管理系统'
        }],
        myTeacher: [{
          name: '王昭顺',
          academy: '计算机与通信工程',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          topic: '毕业设计（论文）管理系统'
        }]
      };
    }
  };
</script>
