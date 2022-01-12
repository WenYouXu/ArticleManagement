<template>
    <div>
        <el-container>
            <el-aside width="200px"><common-aside/></el-aside>
            <el-container>
                <el-header><common-header/></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'

export default {
    components:{
        CommonHeader,
        CommonAside
    },
    data() {  
    return {  

        }  
    }, 

    }
    
</script>

<style  scoped>
.el-header{
    background-color: #c4d5e7;
}
</style>