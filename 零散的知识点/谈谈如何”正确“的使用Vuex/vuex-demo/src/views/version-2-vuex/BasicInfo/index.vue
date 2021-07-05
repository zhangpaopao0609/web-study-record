<template>
  <div class="basic-info">
    <h3>活动基本信息</h3>

    <div class="item">
      <p class="title">活动名称: </p>
      <el-input v-model="activeName" placeholder="请输入内容"></el-input>
    </div>

    <div class="item">
      <p class="title">活动投放时间: </p>
      <el-date-picker
        v-model="activeTime"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
    </div>

    <div class="item">
      <p class="title">活动投放商家: </p>
      <store-list />
    </div>

  </div>
</template>

<script>
import StoreList from "./StoreList/index.vue";

export default {
  name: 'BasicInfo',
  components: {
    StoreList,
  },
  data() {
    return {
      activeName: "",
      activeTime: [],
    }
  },
};
</script>

<style lang="scss" scoped>
.basic-info {
  .item {
    display: flex;
    align-items: center;
    line-height: 60px;

    .title {
      flex-shrink: 0;
      text-align: right;
      min-width: 200px;
      margin-right: 20px;
    }
  }
}
</style>
