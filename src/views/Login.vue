<template>
    <div class=" mt-32">
        <el-row :gutter="20" >
            <el-col :span="8" :offset="8">
            <el-card>
                <h1 class=" text-center font-bold text-2xl">登录</h1>
                <el-divider></el-divider>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <!-- <el-form-item label="用户类型" prop="roleType">
                        <el-input v-model="ruleForm.roleType" autocomplete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item label="账号" prop="userId">
                        <el-input v-model="ruleForm.userId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
     data() {
      
      return {
        ruleForm: {
          userId: '',
          password: '',
          // roleType:''
        },
        rules: {
          userId: [
            { required:true, message:"请输入账号", trigger: 'blur' },
            { min:1 , max:6 , message:"长度在3到6个字符", trigger: 'blur' }
          ],
          password: [
            { required:true, message:"请输入密码", trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.$http.post('api/permission/getMenu',this.ruleForm).then(res =>{
              // this.$http.post('api/api/auth/login',this.ruleForm).then(res =>{
              res = res.data
              console.log(res);
              // if(res.msg === "登录成功"){
                if(res.code === 20000){
                this.$store.commit('clearMenu')
                this.$store.commit('setMenu',res.data.menu)
                this.$store.commit('setToken',res.data.token)
                this.$store.commit('setUsername',res.data.name)
                this.$store.commit('addMenu',this.$router)
                this.$router.push({name:'home'})
              }else{
                this.$message.warning(res.data.message)
              }
            })

            // 写的另一个权限管理
            // this.$refs.ruleForm.validate(async valid => { //规则校验
            //         if(!valid)return
            //         const {data:res} = await this.$http.post('/login/postUserList',this.ruleForm) //发送请求
                    
            //         if(res.meta.status!==200){
            //             return this.$message.error('用户名或密码错误')
            //         }
                    
            //         this.$message.success('登录成功')
            //         this.$router.push({path:'/page'})
            //     })

            
          } else {
            console.log('error !!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      
    }
    
 }
</script>

<style lang="scss" scoped>

</style>