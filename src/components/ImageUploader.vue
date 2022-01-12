<template>
    <div class="uploader"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="onDrop"
        :class="{ dragging: isDragging }">
        
        <div class="upload-control" v-show="images.length">
            <label for="file">选择文件</label>
            <button type="button" @click="upload">上传</button>
        </div>


        <div v-show="!images.length">
            <i class="fa fa-cloud-upload"></i>
            <p>请拖入图片</p>
            <div>或者</div>
            <div class="file-input">
                <label for="file">选择文件</label>
                <form action="post" enctype="multipart/form-data">
                    <input  type="file" id="file" @change="onInputChange" multiple>
                </form>
                
            </div>
        </div>

        <div class="images-preview" v-show="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <img :src="image" ref="avatar" :alt="`Image Uplaoder ${index}`">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        isDragging: false,
        dragCount: 0,
        files: [],
        images: []
    }),
    methods: {
        OnDragEnter(e) {
            e.preventDefault();
            
            this.dragCount++;
            this.isDragging = true;

            return false;
        },
        OnDragLeave(e) {
            e.preventDefault();
            this.dragCount--;

            if (this.dragCount <= 0)
                this.isDragging = false;
        },
        onInputChange(e) {
            const files = e.target.files;
        // 在e事件中拿到的file数组是一个伪数组，所以我们要把它变成一个数组
            Array.from(files).forEach(file => this.addImage(file));
        },
        onDrop(e) {
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = false;

            const files = e.dataTransfer.files;

            Array.from(files).forEach(file => this.addImage(file));
        },
        addImage(file) {
            if (!file.type.match('image.*')) {
                this.$toastr.e(`${file.name} is not an image`);
                return;
            }

            this.files.push(file);

            const img = new Image(),
                reader = new FileReader();

            reader.onload = (e) => this.images.push(e.target.result);

            reader.readAsDataURL(file);
        },
        
        upload(e) {
            const formData = new FormData();
            
            this.files.forEach(file => {
                // formData.append('images[]', file, file.name);
                 formData.append('file', file, file.name);
            });

            this.$http.post('/api/file/uploadFile', formData)
            // console.log(formData);
                .then(res => {
                    console.log(res);
                    // this.$toastr.s('All images uplaoded successfully');
                    this.images = [];
                    this.files = [];
                })
            
            this.$emit("uploadImg",this.files)
            // 阻止上传图片后页面跳转和刷新
            return false;
        }
    }
}
</script>

<style lang="scss" scoped>
.uploader {
    // width: 80%;
    background: #e4ecf5;
    color: #fff;
    padding: 40px 15px;
    text-align: center;
    border-radius: 10px;
    border: 2px dashed #fff;
    font-size: 20px;
    position: relative;

    &.dragging {
        background: #fff;
        color: #2196F3;
        border: 3px dashed #2196F3;

        .file-input label {
            background: #2196F3;
            color: #fff;
        }
    }

    i {
        font-size: 85px;
    }

    .file-input {
        width: 200px;
        margin: auto;
        height: 68px;
        position: relative;

        label,
        input {
            background: #fff;
            color: #469de4;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 10px;
            border-radius: 4px;
            margin-top: 7px;
            cursor: pointer;
        }

        input {
            opacity: 0;
            z-index: -2;
        }
    }

    .images-preview {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;

        .img-wrapper {
            width: 160px;
            display: flex;
            flex-direction: column;
            margin: 10px;
            height: 150px;
            justify-content: space-between;
            background: #fff;
            box-shadow: 1px 1px 4px #3e3737;

            img {
                max-height: 150px;
            }
        }

       
    }

    .upload-control {
        position: absolute;
        width: 100%;
        background: #fff;
        top: 0;
        left: 0;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 10px;
        padding-bottom: 4px;
        text-align: left;

        button, label {
            background: #2196F3;
            border: 2px solid #03A9F4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }

        label {
            padding: 2px 5px;
            margin-right: 10px;
        }
    }
}
</style>