<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="addEditorPage">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()"  @del="delEdit"></common-table>
  </div>
</template>

<script>
import CommonForm from '../components/CommonForm'
import CommonTable from '../components/CommonTable.vue'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: 'position',
          label: '所属位置'
        },
        {
          prop: 'tag',
          label: '标签'
        },
        {
          prop: 'title',
          label: '标题',
          width: 320
        },
        {
          prop: 'articleDate',
          label: '创建时间',
          width: 200
        },
      ],
      config: {
        pageNumber: 1,
        pageSize: 30,
        loading: false,
        tag:'',
        title:''
      },
      config1: {
        pageNumber: 1,
        pageSize: 30,
        loading: false,
        tag:'',
        title:''
      },
      searchFrom: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    addEditorPage(){
      this.$router.push({path:'/editor'})
    },

    getList(title = '') {
      this.config.loading = true
     // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      title ? (this.config.pageNumber = 1) : ''
      this.$http
        .post('/api/sysArticle/page', {
          params: {
            page: this.config,
            title
          }
        })
        .then(res => {
          // console.log(res.data.data);
          this.tableData = res.data.data.map(item => {
            return item
          })
          this.config.pageSize = res.data.count
          this.config.loading = false
        })
    },
    
    delEdit(Row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      
        .then(() => {
          var qs = require('qs')
          let ids = Row
            this.$axios
            .post('/api/sysArticle/delete', 
            qs.stringify({
              ids
            }),
            {
              headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'}
            })
          
            .then(res => {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common';
</style>
