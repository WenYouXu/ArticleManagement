import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 全局配置
import './assets/css/twstyle.css'
import 'element-ui/lib/theme-chalk/index.css';
import http from '../src/api/config'
import './mock'

// 第三方包
import ElementUI from 'element-ui';


Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  let token = store.state.user.token
  if(!token && to.name !=='login') {
    next({name:'login'})
  }else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
