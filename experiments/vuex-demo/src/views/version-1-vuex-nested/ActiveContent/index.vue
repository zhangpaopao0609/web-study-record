<template>
  <div class="active-content">
    <h3>活动具体内容</h3>
    <div class="item">
      <p class="title">活动宣传页地址: </p>
      <el-input
        v-model="activeAddress"
        placeholder="请输入宣传页地址"
      ></el-input>
    </div>

    <div class="item">
      <p class="title">活动主要产品: </p>
        <el-select
          v-model="activeProduct"
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
          label: '麻辣火锅'
        }, {
          value: '004',
          label: '龙须面'
        }, {
          value: '005',
          label: '北京烤鸭'
        }],
    };
  },
  computed: {
    activeAddress:  {
      get() {
        return this.$store.state.active.activeInfo.activeAddress;
      },
      set(val) {
        this.$store.commit('active/UPDATE_ACTIVE', {
          activeAddress: val,
        });
      }
    },
    activeProduct:  {
      get() {
        return this.$store.state.active.activeInfo.activeProduct;
      },
      set(val) {
        this.$store.commit('active/UPDATE_ACTIVE', {
          activeProduct: val,
        });
      }
    },
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
