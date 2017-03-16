<style lang="scss" src="./Home.scss"></style>

<template lang="html">
  <div class="main-wrapper">
    <div class="main main-step">
      <h2 class="main-title">当前状态</h2>
      <button class="button-dom text black-color goto-btn">去提交任务书-></button>
      <div class="step-wrapper">
        <el-steps :space="80" :active="1" direction="vertical" finish-status="success">
          <el-step title="学生、导师双向选择" description="学生和导师之间进行双向选择，每个学生可以按照填报三个志愿导师。"></el-step>
          <el-step title="提交任务书" description="按要求撰写任务书。"></el-step>
          <el-step title="提交选题报告" description="按要求撰写选题报告。"></el-step>
          <el-step title="提交中期报告" description="按要求撰写中期报告"></el-step>
          <el-step title="答辩并提交毕业设计（论文）" description="按要求准备答辩并撰写毕业设计（论文）"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="main main-notice">
      <h2 class="main-title">公告</h2>
      <!-- <h5 class="no-notice-title">暂无公告</h5> -->
      <ul class="notice-list">
        <li class="notice-item">
          <h5 class="notice-title">临近任务书提交时间</h5>
          <p class="notice-content">请各位同在XXXX日之前尽快提交任务书。</p>
        </li>
        <li class="notice-item">
          <h5 class="notice-title">临近任务书提交时间</h5>
          <p class="notice-content">请各位同在XXXX日之前尽快提交任务书。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Step, Steps } from 'element-ui';

  Vue.use(Step);
  Vue.use(Steps);

  export default {
    name: 'home'
  };
</script>
