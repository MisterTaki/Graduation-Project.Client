<style scoped lang="scss" src="./SystemSettings.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main">
      <h2 class="title">系统设置</h2>
      <div class="settingsForm-wrapper">
        <el-form ref="settingsForm" :model="settingsForm" label-width="100px" :rule="rules.settingsForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="双向选择">
                <el-date-picker
                  class="date-picker"
                  v-model="settingsForm.status_startAt[0]"
                  type="date"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务书">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_startAt[1]"
                  type="date"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="选题报告">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_startAt[2]"
                  type="date"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中期报告">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_startAt[3]"
                  type="date"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="终期答辩">
                <el-date-picker class="date-picker"
                  v-model="settingsForm.status_startAt[4]"
                  type="date"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-btn-group">
            <el-button type="primary" @click="submitSettings">立即保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Message } from 'element-ui';
  import moment from 'moment';
  import mixins from '@/mixins';
  import store from '@/store';

  export default {
    name: 'system-settings',
    mixins: [mixins],
    data () {
      return {
        settingsForm: {
          status_startAt: ['', '', '', '', '']
        },
        rules: {
          settingsForm: {
            date: [
              { required: true, message: '请选择时间' }
            ]
          }
        }
      };
    },
    computed: mapState({
      status_startAt: ({ system }) => system.status_startAt.value
    }),
    methods: {
      submitSettings () {
        if (JSON.stringify(this.settingsForm.status_startAt) === JSON.stringify(this.status_startAt)) {
          Message.closeAll();
          Message.warning('未作出更改');
          return false;
        } else if (this.settingsForm.status_startAt.some(item => item === undefined)) {
          Message.closeAll();
          Message.warning('请设置完整时间');
          return false;
        }
        const times = this.settingsForm.status_startAt;
        /* eslint camelcase: 0 */
        const status_startAt = [];
        status_startAt.push(moment(times[0]).format('YYYY-MM-DD'));
        for (let i = 0; i < times.length - 1; i += 1) {
          if (moment(times[i]).isAfter(times[i + 1])) {
            Message.closeAll();
            Message.warning('时间阶段设置错误');
            return false;
          }
          status_startAt.push(moment(times[i + 1]).format('YYYY-MM-DD'));
        }
        return store.dispatch('system/MODIFY', { status_startAt })
          .then(() => {
            Message.closeAll();
            Message.success('保存成功');
          })
          .catch(() => false);
      }
    },
    created () {
      for (let i = 0; i < this.status_startAt.length; i += 1) {
        this.settingsForm.status_startAt[i] = this.status_startAt[i];
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.system.status_startAt.loaded) {
        return store.dispatch('system/OBTAIN')
          .then(() => next())
          .catch(() => next(false));
      }
      return next();
    }
  };
</script>
