<template>
  <div class="common-table">
      <!-- v-loading：实现局部区域加载效果 -->
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
            <!-- 这里的index索引是0所以加一 -->
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <router-link :to="'/editor?id='+scope.row.id"><el-button size="mini">编辑文章</el-button></router-link>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 通过sync可以双向绑定，同步到父组件 -->
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleDelete(row) {
      console.log(row);
      let Row = row.id
      this.$emit('del', Row)
      // console.log(ids);
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
