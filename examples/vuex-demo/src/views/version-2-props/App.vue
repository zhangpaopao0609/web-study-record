<script>
import BasicInfo from './BasicInfo/index.vue';
import StoreList from './StoreList/index.vue';
import ActiveContent from './ActiveContent/index.vue';

export default {
  name: 'App',
  components: {
    BasicInfo,
    StoreList,
    ActiveContent,
  },
  data() {
    return {
      activeInfo: {
        activeName: 'ardor',
        activeTime: ['2021-08-01-00-00-00', '2021-08-02-00-00-00'],
        activeSelectionStore: 2,
        activeAddress: '四川省',
        activeProduct: '003',
      },
    };
  },

  methods: {
    handleStateChange(key, val) {
      this.activeInfo = {
        ...this.activeInfo,
        [key]: val,
      };
    },
    handleSubmitActive() {
      alert(JSON.stringify(this.activeInfo, null, 2));
    },
    handleClearAll() {
      this.activeInfo = {
        activeName: '',
        activeTime: [],
        activeSelectionStore: 0,
        activeAddress: '',
        activeProduct: '',
      };
    },
  },
};
</script>

<template>
  <div id="app">
    <div class="basic-info-item">
      <h3>活动基本信息</h3>
      <BasicInfo
        :active-info="activeInfo"
        @state-change="handleStateChange"
      />
      <StoreList
        :active-info="activeInfo"
        @state-change="handleStateChange"
      />
    </div>

    <div class="active-content-item">
      <h3>活动具体内容</h3>
      <ActiveContent
        :active-info="activeInfo"
        @state-change="handleStateChange"
      />
    </div>

    <div class="action">
      <el-button
        type="primary"
        @click="handleSubmitActive"
      >
        确定
      </el-button>
      <el-button
        @click="handleClearAll"
      >
        清空
      </el-button>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 40%;
  text-align: left;
  color: #2c3e50;
  margin: 60px auto;

  .action {
    text-align: right;
    margin-top: 40px;
  }

  .active-content-item {
    margin-top: 40px;
  }
}
</style>
