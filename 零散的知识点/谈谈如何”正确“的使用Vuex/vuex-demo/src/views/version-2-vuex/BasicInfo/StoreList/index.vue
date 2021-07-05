<template>
  <div class="store-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column  prop="platform" label="平台" width="120">
      </el-table-column>
      <el-table-column prop="name" label="名字" width="120"> </el-table-column>
      <el-table-column prop="mianShop" label="主要经营" >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StoreList",
  data() {
    return {
      tableData: [
        {
          platform: "某东",
          name: "王小虎",
          mianShop: "青蛙、阿首都、大爱的速递按时",
        },
        {
          platform: "某宝",
          name: "阿发",
          mianShop: "其味无穷王企鹅群无气味恶趣味气味气味",
        },
        {
          platform: "某当",
          name: "施工方",
          mianShop: "发生啊阿首都爱的速递所阿首都啊",
        },
        {
          platform: "某多",
          name: "服小米",
          mianShop: "发生的阿斯达大声道ad按时",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.store-list {
  width: 100%;
}
</style>
