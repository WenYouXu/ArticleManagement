<template>
    <div>
        <el-form action="post" enctype="multipart/form-data" v-model="saveContent" :rules="textRules"  ref="ruleForm" label-width="100px">
             <el-form-item label="文章所属位置" prop="type">
                <el-select v-model="saveContent.position" placeholder="请选择文章的排版位置" class=" w-4/12">
                    <el-option label="Banner位" value="Banner位"></el-option>
                    <el-option label="推荐位" value="推荐位"></el-option>
                    <el-option label="常规位" value="常规位"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="saveContent.articleDate" class=" w-9/12"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="封面" class=" w-4/12">
                <image-upload @uploadImg="getImg" v-model="saveContent.image" ></image-upload>
            </el-form-item> -->
            <el-form-item label="封面" >
                <el-input v-model="saveContent.image" v-if="false"></el-input>
                            <el-upload
                            class="avatar-uploader"
                            action="/api/file/uploadFile"
                            accept=".jpg, .jpeg, .png"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :data="saveContent"
                            >
                            <img v-if="saveContent.image" :src="saveContent.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                </el-form-item>
              
             <el-form-item label="标签" class=" w-9/12">
                <el-input v-model="saveContent.tag"></el-input>
            </el-form-item>
             <el-form-item label="文章标题" class=" w-9/12">
                <el-input v-model="saveContent.title"></el-input>
            </el-form-item>
             <el-form-item label="文章概述" class=" w-9/12">
                <el-input v-model="saveContent.articleSummary"></el-input>
            </el-form-item>
            <el-form-item label="正文" class=" mr-7 ">
                <common-text  v-model="saveContent.content" class="wang w-9/12"></common-text>
            </el-form-item>
            
            <!-- <el-form-item label="正文" class=" w-9/12">
                <common-text1 class="wang" v-model="saveContent.content" ></common-text1>
            </el-form-item> -->
            
            <div class=" flex ">
            <el-form-item>
                 <el-button type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
            <el-form-item>
                <router-link to="/page"> <el-button class=" ">取消</el-button></router-link>
            </el-form-item>
            </div>
        </el-form>

        
    </div>

</template>

<script>
import CommonForm from '../components/CommonForm.vue'
import CommonText from '../components/CommonText.vue';
import imageUpload from '../components/ImageUploader.vue'

    export default {
        components:{
            CommonForm,
            CommonText,
            imageUpload,
            
        },
        data(){
            return{
                fileList:[],
                imageUrl:"",
                saveContent:{
                    position:'',
                    articleDate:'',
                    tag:'',
                    title:'',
                    articleSummary:'',
                    content:'',
                    image:'',
                    id:''
                },
                params:{},
                textRules:{
                    title:[
                        {required:true , message:'文章名称必填' , trigger:'blur'},
                        {min:1 , max:25, message:'文章名称必须是1-25字', trigger:'blur'}
                    ],
                    sort:[
                        {required:true , message:'必须选择一个文章类型', trigger:'change'}
                    ]
                }
            
            }
        },
        // 监听路由是否发生变化
        watch:{
            $route(to,from){
                this.init()
            }
        },
        created() {
            // 执行此方法，获取我们的参数,获取已编辑过的文章信息
            this.init()
        },
        methods:{
            init(){
                // 判断是否有参数
                if(this.$route.query && this.$route.query.id){   // 当页面加载时就要获取参数的值了
                    this.getEditorList()
                }else{
                    // 没有参数  清空
                    this.saveContent = {}
                }
            },

            getEditorList() {
                let id=this.$route.query.id
                this.$http
                    .get('/api/sysArticle/get', {
                        params: {
                                id
                            }
                    })
                    .then(res => {
                        this.saveContent = res.data.data
                    })
                },
        // ====================================================
            // 图片自动上传
            //上传成功后获取到图片路径,并且把原本的图片名称传到后台去，需要拼接一下
             uploadSuccess(res, file, fileList){
                 console.log(res);
                this.imageUrl="http://47.96.231.92:8081/drdImg/" + res.data.fileName;
                this.saveContent.image = this.imageUrl
            },
           
        //    handleChange (file, fileList) {
        //         this.saveContent.image = URL.createObjectURL(file.raw);
        //     },
        // ======================================================


        //  根据id来判断是新增还是修改
        saveOrUpdate(){
            if(this.saveContent.id){
                this.updateById()
            }else{
                this.save()
            }
           },
        updateById(){
             this.$http.post('/api/sysArticle/update',this.saveContent).then(res =>{
                   console.log(res);
                return this.$message({
                    type:'success',
                    message:'修改成功'
                })
               })
               .then(res=>{
                   this.$router.push({path:"/page"})
               })
               .catch(res =>{
                   return this.$message({
                       type:'error',
                       message:'保存失败'
                   })
               })
        },

        save(){
            this.$http.post('/api/sysArticle/save',this.saveContent)
                .then(res =>{
                    console.log(res);
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                })
                .then(res =>{
                    this.$router.push({path:"/page"})
                })
                .catch(response => {
                this.$message({
                type:'error',
                message:response.data.message
                })
            })
        },
            
        },
        
        mounted(){
            
        }
    }
</script>

<style >
.w-e-toolbar{
  z-index: 2 !important;
}
.w-e-menu {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>