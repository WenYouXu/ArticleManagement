<template>
  <div>
    <div id="wangeditor">
      <div ref="editorElem"></div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor"
  export default {
    data() {
      return {
      editor: "",
    }},
    props:['catchData1'],//接收父组件的方法
    mounte(){
      this.editor = new E(_this.$refs.editorElem);//获取组件并构造编辑器
      this.editor.create(); // 创建富文本实例
      this.editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
    ]

    // 自定义颜色
    this.editor.customConfig.colors = [
    "#000000",
    "#333333",
    ];
    // 自定义字体
    this.editor.customConfig.fontNames = [
    "PingFangSC",
    ];
    //配置多种语言--就是将编辑器原本文字配置成你需要的文字、
    //***链接文字一定要在链接的上面
    this.editor.customConfig.lang = {
    '设置标题': 'title',
    '正文': 'p',
    '链接文字': 'link text',
    '链接': 'link',
    '上传图片': 'upload image',
    '上传': 'upload',
    '创建': 'init'
    // 还可自定添加更多
    }

    //设置编辑器内容
this.editor.txt.html("yanyanyan");
this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
// 编辑器的事件，每次改变会获取其html内容（html内容是带标签的）
this.editor.customConfig.onchange = html => {
this.formValidate.content = html;
};
// 设置编辑器层级
this.editor.customConfig.zIndex = 10;
// 去除复制过来文本的默认样式
this.editor.customConfig.pasteFilterStyle = true;
//用户点击富文本区域会触发onfocus函数执行
this.editor.customConfig.onfocus = function () {
        console.log("onfocus")
    }
// 将图片大小限制为 3M
this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
// 限制一次最多上传 5 张图片
this.editor.customConfig.uploadImgMaxLength = 5
//上传图片的错误提示默认使用alert弹出,也可以自定义用户体验更好的提示方式
editor.customConfig.customAlert = function (info) {
    // info 是需要提示的内容
    alert('自定义提示：' + info)
}

// 上传图片到服务器,对应的是controller层的@RequestMapping("/upload")
this.editor.customConfig.uploadImgServer = "/api/api/file/uploadFile";//接口名称
//自定义name,接收的时候图片文件的那么用这个，对应的是参数中的MultipartFile upimg名称,这个名称即上传到浏览器的参数名称
this.editor.customConfig.uploadFileName = "file";//这个需要和后台商量上传图片的名称
// 上传图片的结果反馈
this.editor.customConfig.uploadImgHooks = {
before: function(xhr, editor, files) {
// 图片上传之前触发
// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
// return {
// prevent: true,
// msg: '放弃上传'
// }
// console.log("before:",xhr)
},
success: function(xhr, editor, result) {
// 图片上传并返回结果，图片插入成功之后触发
// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
// console.log("success:",result)
},
fail: function(xhr, editor, result) {
// 图片上传并返回结果，但图片插入错误时触发
// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
},
error: function(xhr, editor) {
// 图片上传出错时触发
// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
},
// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
customInsert: function(insertImg, result, editor) {
// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
// insertImg 是插入图片的函数，参数editor 是编辑器对象，result 是服务器端返回的结果
// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
var url = result.result.remote_path;
insertImg(url);
// result 必须是一个 JSON 格式字符串！！！否则报错
}
};
// }

    }
  }
</script>

<style lang="scss" scoped>

</style>