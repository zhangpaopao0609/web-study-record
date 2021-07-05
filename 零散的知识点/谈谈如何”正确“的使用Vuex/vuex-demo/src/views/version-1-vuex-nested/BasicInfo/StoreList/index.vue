<template>
  <div class="store-list">
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
            v-model="activeSelectionStore"
            :label="scope.row.id" 
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
  computed: {
    activeSelectionStore: {
      get() {
        return this.$store.state.active.activeInfo.activeSelectionStore;
      },
      set(val) {
        this.$store.commit('active/UPDATE_ACTIVE', {
          activeSelectionStore: val,
        });
      }
    },
  },
  methods: {
    handleSelect(row) {
      this.activeSelectionStore = row.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.store-list {
  width: 100%;
}
</style>
