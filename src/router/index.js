import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    // redirect: '/login'
  },
  
  {
    path: '/',
    name:'main',
    component: () => import('@/views/Main.vue'),
    children:[
      // {
      //   path: '/',
      //   name: 'home',
      //   component: () => import('@/views/Home.vue')
      // },
      // {
      //   path: '/page',
      //   name: 'page',
      //   component: () => import('@/views/PageManage.vue')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('@/views/UserManage.vue')
      // },
      // {
      //   path: '/other1',
      //   name: 'other1',
      //   component: () => import('@/views/Other1.vue')
      // },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/EditorPage.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
