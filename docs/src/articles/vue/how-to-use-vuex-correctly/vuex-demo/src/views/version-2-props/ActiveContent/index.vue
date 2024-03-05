<template>
  <div class="active-content">
    <div class="item">
      <p class="title">活动宣传页地址: </p>
      <el-input
        :value="activeInfo.activeAddress"
        @input="(val) => handleStateChange('activeAddress', val)"
        placeholder="请输入宣传页地址"
      ></el-input>
    </div>

    <div class="item">
      <p class="title">活动主要产品: </p>
        <el-select
          :value="activeInfo.activeProduct"
          @change="(val) => handleStateChange('activeProduct', val)"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ActiveContent',
  props: {
    activeInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: [{
        value: '001',
        label: '黄金糕'
      }, {
        value: '002',
        label: '双皮奶'
      }, {
        value: '003',
        label: '蚵仔煎'
      }, {
        value: '004',
        label: '龙须面'
      }, {
        value: '005',
        label: '北京烤鸭'
      }],
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
.active-content {
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
