<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>

<script>
import CommonForm from '../components/CommonForm'
import CommonTable from './component/UserTable.vue'
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        pageNumber: 1,
        pageSize: 30,
        loading: false,
        name:'',
        sex:'',
        userId:''
      },
      operateForm: {
        name: '',
        address: '',
        age: '',
        birth: '',
        sex: '',
        birth:'',
        password:'',
        userId:''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 0
            },
            {
              label: '女',
              value: 1
            }
          ]
        },
        {
          model: 'birth',
          label: '生日',
          type: 'date',
        },
        {
          model: 'address',
          label: '地址'
        },
        {
          model: 'password',
          label: '密码',
        },
        {
          model: 'userId',
          label: '用户ID',
        }
       
      ],
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
    getList(name = '') {
      this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.pageNumber = 1) : ''
      this.$http.post('/api/sysUser/page', {
          params: {
            page: this.config,
            name
          }
        })
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.map(item => {
            item.sexLabel = item.sex === 0 ? '男' : '女'
            return item
          })
          this.config.pageSize = res.data.count
          this.config.loading = false
        })
    },
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/api/sysUser/update', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/api/sysUser/save', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      }
    },
    delUser(Row) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var qs = require('qs')
          let ids = Row
            this.$axios
            .post('/api/sysUser/delete', 
            qs.stringify({
              ids
            }),
            {
              headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'}
            })
          // this.$http
          //   .post('/api/api/sysUser/delete', {
          //     params: {
          //       ids
          //     },
          //     headers: { 'Content-Type':'application/x-www-form-urlencoded'}
          //   })
         
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
