<template>
  <div class="basic-info">
    <div class="item">
      <p class="title">活动名称: </p>
      <el-input
        :value="activeInfo.activeName"
        placeholder="请输入内容"
        @input="(val) => handleStateChange('activeName', val)"
      ></el-input>
    </div>

    <div class="item">
      <p class="title">活动投放时间: </p>
      <el-date-picker
        v-model="activeTime"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd-HH-mm-ss"
       >
      </el-date-picker>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BasicInfo',
  props: {
    activeInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    activeTime: {
      get() { return this.activeInfo.activeTime },
      set(val) { this.handleStateChange('activeTime', val) }
    }
  },
  methods: {
    handleStateChange(key, val) {
      this.$emit("stateChange", key, val);
    },
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
