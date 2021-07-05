<template>
  <div class="store-list">
    <p class="title">活动投放商家: </p>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handleSelect"
    >
      <el-table-column width="55">
        <template slot-scope="scope">
          <el-radio
            :value="activeInfo.activeSelectionStore"
            :label="scope.row.id" 
            @change="handleStateChange('activeSelectionStore', scope.row.id)"
          ></el-radio>
        </template>
      </el-table-column>
      
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
  props: {
    activeInfo: {
      type: Object,
      required: true,
    },
  },
  
  data() {
    return {
      tableData: [
        {
          id: 1,
          platform: "某东",
          name: "王小虎",
          mianShop: "青蛙、阿首都、大爱的速递按时",
        },
        {
          id: 2,
          platform: "某宝",
          name: "阿发",
          mianShop: "其味无穷王企鹅群无气味恶趣味气味气味",
        },
        {
          id: 3,
          platform: "某当",
          name: "施工方",
          mianShop: "发生啊阿首都爱的速递所阿首都啊",
        },
        {
          id: 4,
          platform: "某多",
          name: "服小米",
          mianShop: "发生的阿斯达大声道ad按时",
        },
      ],
    };
  },

  methods: {
    handleSelect(row) {
      this.activeSelectionStore = row.id;
      this.handleStateChange('activeSelectionStore', row.id);
    },
    handleStateChange(key, val) {
      this.$emit("stateChange", key, val);
    },
  },
};
</script>

<style lang="scss" scoped>
.store-list {
  width: 100%;
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
</style>
