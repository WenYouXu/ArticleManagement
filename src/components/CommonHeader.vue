<template>
    <div>
        <header class=" flex items-center justify-between ">
               <div class="l-content flex items-center justify-start mt-4 ">
                   <!-- <el-button class="" icon="el-icon-menu" size="mini"></el-button> -->
                   <el-breadcrumb separator="/" class=" ml-4">
                        <el-breadcrumb-item :to="{ path: '/' }" >文章管理</el-breadcrumb-item>
                        <el-breadcrumb-item :to="current.path" v-if="current" >
                            {{current.label}}
                        </el-breadcrumb-item>
                   </el-breadcrumb>
               </div>
               <div class="r-content mt-4">
                    <!-- <el-dropdown >
                    <span class="el-dropdown-link text-white">
                       <img :src="userImg" class=" w-10 h-10 rounded-full border">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >个人中心</el-dropdown-item> -->
                        <!-- 由于这个组件中没有提供click这个方法，我们要在后面加上native修饰符 表示我们使用的是原生的点击事件 -->
                        <!-- <el-dropdown-item @click.native="logOut" > 退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown> -->
                    <div class=" text-gray-500">
                        {{userId}} <el-button size="mini" @click.native="logOut">退出</el-button>
                   </div>
               </div>
        </header>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        computed:{
           ...mapState(
               {
               current:state =>state.tab.currentMenu,
               userId:state =>state.user.userId
                }
                
            )
        },
        data(){
            return{
                userImg:require('../assets/img/user.jpg')
            }
        },
        methods:{
           logOut(){
               this.$store.commit('clearToken')
               this.$store.commit('clearMenu')
            //    刷新
               location.reload()
           }
        }
        
    }
</script>

<style  scoped>
.el-breadcrumb__inner a.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: royalblue;
}
.el-breadcrumb::after{
    color: #fff;
}
 .el-breadcrumb__inner:hover{
     color: royalblue;
 }
</style>