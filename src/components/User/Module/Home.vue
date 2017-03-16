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

<style lang="css">
  .button-dom {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    line-height: 40px;
    cursor: pointer;
    &.text {
      line-height: 1;
      &.black-color {
        background-color: transparent;
        color: $black;
        &:hover {
          color: $lightBlue;
        }
      }
    }
    &.goto-btn {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 12px;
      line-height: 20px;
    }
  }
  .main-wrapper {
    padding: 30px 20px 0;
    @include clearfloat;
  }
  .main {
    position: relative;
    float: left;
    box-sizing: border-box;
    padding: 30px 20px;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0,0,0,0.1);
    transition: all .4s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }
  }
  .main-step {
    width: 56%;
    margin-right: 2%;
  }
  .main-notice {
    width: 42%;
  }
  @media screen and (max-width: 1080px) {
    .main {
      width: 100%;
    }
  }
  .step-wrapper {
    position: relative;
    padding: 30px;
  }
  .main-title {
    padding: 0 0 10px 10px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    font-size: 20px;
  }
  .no-notice-title {
    margin-top: 20px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .notice-list {
    padding: 0 10px;
  }
  .notice-item {
    margin: 10px 0;
  }
  .notice-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 34px;
  }
  .notice-content {
    font-size: 12px;
    line-height: 24px;
  }
</style>
