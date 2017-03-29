<style scoped lang="scss" src="./SystemSettings.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">系统设置</h2>
      <div class="settingsForm-wrapper">
        <el-form ref="form" :model="settingsForm" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务书">
                <el-date-picker
                  class="date-picker"
                  v-model="settingsForm.status_1"
                  type="datetimerange"
                  :editable=false
                  placeholder="选择时间范围">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选题报告">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_2"
                  type="datetimerange"
                  :editable=false
                  placeholder="选择时间范围">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="中期报告">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_3"
                  type="datetimerange"
                  :editable=false
                  placeholder="选择时间范围">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最终报告">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_4"
                  type="datetimerange"
                  :editable=false
                  placeholder="选择时间范围">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-btn-group">
            <el-button type="primary" @click="submitSettings">立即保存</el-button>
            <el-button @click="resetForm('settingsForm')">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox, Message } from 'element-ui';
  import mixins from '@/mixins';

  export default {
    name: 'system-settings',
    mixins: [mixins],
    data () {
      return {
        settingsForm: {
          status_1: '',
          status_2: '',
          status_3: '',
          status_4: '',
        }
      };
    },
    methods: {
      submitSettings () {
        MessageBox.confirm('确认保存此系统设置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Message.success('保存成功');
        });
      }
    }
  };
</script>
