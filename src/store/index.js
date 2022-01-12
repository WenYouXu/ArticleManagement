import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions';
import * as getters from './getters';

import tab from './tab'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    tab,
    user
  },
  mutations:{
  // 案例一
    updateValue(state,value){
      state.value = value;
    },

  // 案例二
      markVideoPlayed(state){
        // 设置state
        state.isPlayed = true;
        // s设置storage
        window.localStorage.isPlayed = JSON.stringify(true)
    },
    setPlayStatus(state,status) {
      state.isPlayed = status;
    },

    // 保存表单的值到缓存
    longSave(){
      state.count = window.localStorage.newinput;
      
    }
  },

  actions:{
    loadVideoStatus({commit}){
      // 发送请求 axios.get(....)
      // 除此之外，我们还会通过JSON.parse获取一下以下(等号右边内容)，然后把它保存在一个变量videoStatus中
      let videoStatus = JSON.parse(window.localStorage.isPlayed);
      commit('setPlayStatus',videoStatus);
    }
  }

})
