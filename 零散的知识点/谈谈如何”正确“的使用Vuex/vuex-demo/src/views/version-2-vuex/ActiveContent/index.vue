<template>
  <div class="active-content">
    <h3>活动具体内容</h3>
    <div class="item">
      <p class="title">活动宣传页地址: </p>
      <el-input v-model="activeAddress" placeholder="请输入宣传页地址"></el-input>
    </div>

    <div class="item">
      <p class="title">活动主要产品: </p>
        <el-select v-model="activeProduct" placeholder="请选择">
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
  data() {
    return {
      activeAddress: '',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        activeProduct: ''
    }
  },
};
</script>

<style lang="scss" scoped>
.active-content {
  margin-top: 40px;
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
