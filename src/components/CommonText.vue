<template>
    <div>
        <div id="wangeditor">
            <div ref="editorElem" @input="change"  style="text-align:left" class=" h-96"></div>
        </div>

    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'editorElem', 
    data () { 
        return { 
            editorContent: '',
            isChange: false,
        }
    },
    // props: ['value'],//接收父组件的方法
    props:{
        value:{
            type:String,
            default:''
        }
    },
    model:{
        prop:'value',
        event:'change'
    },
    watch:{
        value:function(value){
            // 以下解决光标乱跳
            if (!this.isChange) {
                this.editor.txt.html(this.value)
            }
            this.isChange = false
        }
    },
    methods:{
        change (e) {
            // v-model 指令是会给此节点添加一个input事件，我们在给富文本编辑器添加一个input事件，这么做在于，当输入内容后会获取到最新的内容，通过$emit 触发 父组件v-model所添加的input事件并将最新的内容传递过去，传递过去的值默认就会赋给v-model所绑定的属性。
          this.$emit('input', e.target.innerHTML)
        }
    },
    
    mounted() {
        this.editor = new E(this.$refs.editorElem) 
        // 将父组件中v-model所绑定的变量传递给value，再将value赋值给编辑器的内容。
        //   this.editor.txt.html(this.value)  
          // 监听value，因为数据流是向下的传递的，父组件v-model绑定的属性一变化，那么value就会变化，从而获取到最新的值，更新编辑器中的内容。
        //   this.$watch('value', () => {  
            // this.editor.txt.html(this.value)
        //   })
        this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
        
            this.editor.customConfig.menus = [ //菜单配置
             'head', 
             'list', // 列表 
             'justify', // 对齐方式 
             'bold', 'fontSize', // 字号 
             'italic', 
             'underline', 
             'image', // 插入图片 
             'foreColor', // 文字颜色 
             'backColor',  // 背景颜色
             'undo', // 撤销 
             'redo', // 重复 
             ]

            // 本地上传图片
            this.editor.customConfig.uploadImgServer = '/api/file/uploadFile' 
            this.editor.customConfig.uploadFileName = 'file' 
            this.editor.customConfig.uploadImgHeaders = { 
                'Accept': '*/*', 
                // 'Authorization':'Bearer ' + token //头部token 
            }
             //下面是本地上传图片的结果反馈
             this.editor.customConfig.uploadImgHooks = { 
                 before: function (xhr, editor, files) { 
                },
                success: function (xhr, editor, result) {
                    console.log("上传成功");
                },
                fail: function (xhr, editor, result) {
                    console.log("上传失败，原因是"+result);
                },
                error: function (xhr, editor) {
                    console.log("上传出错");
                },
                timeout: function (xhr, editor) {
                    console.log("上传超时");
                },
                // （服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                // 自定义上传图片，回显图片
                customInsert: function (insertImg, result, editor) {
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                   
                    // let url = Object.values(result.data) //result.data就是服务器返回的图片名字和链接
                    console.log(result);
                   var url = "http://47.96.231.92:8081/drdImg/" + result.data.fileName;
                    // JSON.stringify(url) //在这里转成JSON格式
                    insertImg(url)
                   
                    
                }
             }
             this.editor.customConfig.onchange = (html) =>{
                 this.isChange = true;
                 this.editorContent=html  // 绑定当前输入的值
                 this.$emit('change',this.editorContent)  // 将内容同步到父组件中
             }
             this.editor.create()
            }
}
</script>


<style lang="scss" scoped>

</style>