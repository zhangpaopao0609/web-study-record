<script>
import StoreList from './StoreList/index.vue';

export default {
  name: 'BasicInfo',
  components: {
    StoreList,
  },
  computed: {
    activeName: {
      get() {
        return this.$store.state.active.activeInfo.activeName;
      },
      set(val) {
        this.$store.commit('active/UPDATE_ACTIVE', {
          activeName: val,
        });
      },
    },
    activeTime: {
      get() {
        return this.$store.state.active.activeInfo.activeTime;
      },
      set(val) {
        this.$store.commit('active/UPDATE_ACTIVE', {
          activeTime: val,
        });
      },
    },
  },
};
</script>

<template>
  <div class="basic-info">
    <h3>活动基本信息</h3>

    <div class="item">
      <p class="title">
        活动名称:
      </p>
      <el-input
        v-model="activeName"
        placeholder="请输入内容"
      />
    </div>

    <div class="item">
      <p class="title">
        活动投放时间:
      </p>
      <el-date-picker
        v-model="activeTime"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd-HH-mm-ss"
      />
    </div>

    <div class="item">
      <p class="title">
        活动投放商家:
      </p>
      <StoreList />
    </div>
  </div>
</template>

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
