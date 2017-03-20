<style scoped lang="scss" src="./MyStudents.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">我的学生：</h2>
      <div class="myTeacher-wrapper">
        <template v-if="status===0">
          <div class="status">
            <h5 class="notice">学生端正在选择志愿导师，请耐心等候：）</h5>
          </div>
        </template>
        <template v-else-if="status===1">
          <div class="status">
            <h5 class="notice">还没有选择学生，点击右下角的“开始选择学生”来开始：）</h5>
            <router-link to="choose-students" class="choose-btn">开始选择学生</router-link>
          </div>
        </template>
        <template v-else-if="status===2">
          <div class="status">
            <el-table class="myStudents-table myStudents-view--table" :data="myStudents" stripe border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学号：">
                      <span>{{ props.row.studentID }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="班级：">
                      <span>{{ props.row.class }}</span>
                    </el-form-item>
                    <el-form-item label="学院：">
                      <span>{{ props.row.academy }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="手机：">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column width="140" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="topic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-students',
    data () {
      return {
        status: 1, // 0:学生正在选择，1:开始选择学生，2:已选择完成
        myStudents: [
          {
            name: '高琦',
            studentID: '41355025',
            gender: '男',
            class: '计1301',
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            topic: '毕业设计（论文）管理系统'
          },
          {
            name: '高琦',
            studentID: '41355025',
            gender: '男',
            class: '计1301',
            academy: '计算机与通信工程',
            email: 'ustb_gaoqi@163.com',
            mobile: '15652063671',
            topic: '毕业设计（论文）管理系统'
          },
        ],
      };
    }
  };
</script>
