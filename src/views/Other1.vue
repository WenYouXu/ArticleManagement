<template>
    <div>
        <h3>{{$store.state.count}}</h3>


        <div>案例一</div>
        <input type="text" v-model="value" class=" border-2">
        <!-- <button @click="saveToPage"> 播放</button> -->
        <div>表单处理：{{value}}</div>
        <div>案例二</div>
        <div>播放状态：{{$store.state.isPlayed}}</div>
        <button @click="onClick">点击播放</button>
        <div>案例三</div>

        <input v-model="$store.state.count" @input="updateMessage" class=" border-2" >
        <h3>{{$store.state.count}}</h3>
        <button @click="longs">长久保存</button>

    </div>
</template>

<script>
    export default {
        mounted(){
            this.$http.get('/user/getData').then(
                res => {
                    console.log(res.data)
                }
            )
        },
        methods:{
            save(){
                this.$store.commit('saveToPage')
            },
            onClick(){
                this.$store.commit('markVideoPlayed')
            },
            longs(){
                this.$store.commit('longSave')
            },
            updateMessage(e){
                const newinput = e.target.value
                const title = window.localStorage.newinput = JSON.stringify(newinput,title)
            }
            
        },
        
    }
</script>

<style lang="scss" scoped>

</style>