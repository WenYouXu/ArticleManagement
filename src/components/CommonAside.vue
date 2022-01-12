<template>
    <div>
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#2b527a"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu :index="item.path+''" v-for="(item,index) in hasChildren" :key="index">
                <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">{{subItem.label}}
                    <i :class="'el-icon-'+subItem.icon"></i>
                    <span slot="title">{{subItem.label}}</span>
                </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed:{
                noChildren(){
                    return this.menu.filter(item => !item.children)
                },
                hasChildren(){
                    return this.menu.filter(item => item.children)
                },
                menu(){
                    return this.$store.state.tab.menu
                }
        },
        data(){
            return{
                asideMenu:[
                    {
                        path:'/',
                        name:'home',
                        label:'首页',
                        icon:'s-home'
                    },
                    {
                        path:'/page',
                        name:'page',
                        label:'文章管理',
                        icon:'document'
                    },
                    {
                        path:'/user',
                        name:'user',
                        label:'用户管理',
                        icon:'user'
                    },
                    {
                        label:'其他',
                        name:'other',
                        icon:'fold',
                        children:[
                            {
                                path:'/other1',
                                name:'other1',
                                // label:'页面1',
                                // icon:'setting'
                            },
                            {
                                path:'/page2',
                                name:'page2',
                                // label:'页面2',
                                // icon:'setting'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            clickMenu(item){
                this.$router.push({name: item.name})
                this.$store.commit('selectMenu',item)
            }
        }
        
    }
</script>

<style  scoped>
.el-menu{
    height: 100vh;
    border: none;
}
</style>