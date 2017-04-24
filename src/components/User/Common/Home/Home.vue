<style scoped lang="scss" src="./Home.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main main-step">
      <h2 class="main-title">当前状态</h2>
      <router-link class="goto-link button-dom text black-color goto-btn" :to="gotoLink">{{gotoText}}-></router-link>
      <div class="step-wrapper">
        <el-steps :space="80" :active="stepsActive" direction="vertical" finish-status="success">
          <el-step title="学生、导师双向选择" description="学生和导师之间进行双向选择。"></el-step>
          <el-step title="任务书" description="学生按要求撰写任务书。"></el-step>
          <el-step title="选题报告" description="学生按要求撰写选题报告。"></el-step>
          <el-step title="中期报告" description="学生按要求撰写中期报告。"></el-step>
          <el-step title="答辩并提交毕业设计（论文）" description="学生按要求准备答辩并撰写毕业设计（论文）。"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="main main-notice">
      <h2 class="main-title">公告</h2>
      <template v-if="noticeList.length === 0">
        <h5 class="no-notice-title">暂无公告</h5>
      </template>
      <template v-else>
        <ul class="notice-list">
          <li v-for="item in noticeList" class="notice-item">
            <h5 class="notice-title">{{ item.title }}</h5>
            <p class="notice-content">{{ item.content }}</p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store from '@/store';

  export default {
    name: 'home',
    data () {
      return {
      };
    },
    computed: mapState({
      identity: ({ auth }) => auth.identity,
      systemStatus: ({ system }) => system.status.value,
      noticeList: ({ notice }) => notice.data.value,
      stepsActive () {
        return this.systemStatus - 1;
      },
      gotoText () {
        const candidateTexts = [
          '去进行双向选择',
          '去提交任务书',
          '去提交选题报告',
          '去提交中期报告',
          '去提交最终毕业设计（论文）',
        ];
        return candidateTexts[this.systemStatus - 1];
      },
      gotoLink () {
        if (this.systemStatus === 1) {
          if (this.identity === 'student') return 'my-teacher';
          return 'my-students';
        }
        if (this.identity === 'student') return 'submit-report';
        return 'review-report';
      }
    }),
    methods: {
    },
    beforeRouteEnter (to, from, next) {
      const loads = [];
      if (!store.state.system.status.loaded) loads.push(store.dispatch('system/GET_STATUS'));
      if (!store.state.notice.data.loaded) loads.push(store.dispatch('notice/LOAD'));
      if (loads.length > 0) {
        return Promise.all(loads).then(
          () => next(),
          () => next(false)
        );
      }
      return next();
    }
  };
</script>
