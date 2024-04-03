<script>
import BasicInfo from './views/version-1-vuex-nested/BasicInfo/index.vue';
import ActiveContent from './views/version-1-vuex-nested/ActiveContent/index.vue';

export default {
  name: 'App',
  components: {
    BasicInfo,
    ActiveContent,
  },

  created() {
    console.log(this.$store.state.active.activeInfo);
    this.$store.commit('active/UPDATE_ACTIVE', {
      activeName: 'ardor',
      activeTime: ['2021-08-01-00-00-00', '2021-08-02-00-00-00'],
      activeSelectionStore: 2,
      activeAddress: '四川省',
      activeProduct: '003',
    });
    console.log(this.$store.state.active.activeInfo);
  },

  methods: {
    handleSubmitActive() {
      const activeInfo = this.$store.state.active.activeInfo;
      alert(JSON.stringify(activeInfo, null, 2));
    },
    handleClearAll() {
      this.$store.commit('active/CLEAR_ACTIVE');
    },
  },
};
</script>

<template>
  <div id="app">
    <BasicInfo />
    <ActiveContent />
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
}
</style>
