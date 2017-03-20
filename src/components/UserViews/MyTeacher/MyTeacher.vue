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
            <el-table class="myVolunteer-table myTeacher-view--table" :data="myVolunteers" stripe border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学院：">
                      <span>{{ props.row.academy }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                      <span>{{ props.row.education }}</span>
                    </el-form-item>
                    <el-form-item label="职位职称：">
                      <span>{{ props.row.position }}</span>
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
              <el-table-column width="140" prop="order" label="志愿次序" align="center"></el-table-column>
              <el-table-column width="140" prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
        <template v-else-if="status===2">
          <div class="status">
            <el-table class="myTeacher-table myTeacher-view--table" :data="myTeacher" stripe border>
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" label-width="100px">
                    <el-form-item label="学院：">
                      <span>{{ props.row.academy }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="学历：">
                      <span>{{ props.row.education }}</span>
                    </el-form-item>
                    <el-form-item label="职位职称：">
                      <span>{{ props.row.position }}</span>
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
              <el-table-column prop="choosedTopic" label="选择的研究课题" align="center"></el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-teacher',
    data () {
      return {
        status: 0, // 0:未选择导师，1:等待导师回复中，2:已选择完成
        volunteerListDialog: false,
        myVolunteers: [{
          order: '第一志愿',
          name: '王昭顺',
          gender: '男',
          academy: '计算机与通信工程',
          education: '博士',
          position: '教授（博导）',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          choosedTopic: '毕业设计（论文）管理系统'
        }, {
          order: '第二志愿',
          name: '王昭顺',
          gender: '男',
          academy: '计算机与通信工程',
          education: '博士',
          position: '教授（博导）',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          choosedTopic: '毕业设计（论文）管理系统'
        }, {
          order: '第三志愿',
          name: '王昭顺',
          gender: '男',
          academy: '计算机与通信工程',
          education: '博士',
          position: '教授（博导）',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          choosedTopic: '毕业设计（论文）管理系统'
        }],
        myTeacher: [{
          name: '王昭顺',
          gender: '男',
          academy: '计算机与通信工程',
          education: '博士',
          position: '教授（博导）',
          email: 'zhswang@sohu.com',
          mobile: '13520555528',
          choosedTopic: '毕业设计（论文）管理系统'
        }]
      };
    }
  };
</script>
