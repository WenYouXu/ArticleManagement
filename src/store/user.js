import Cookie from 'js-cookie'
export default {
    state: {
        token:'',
        userId:''
    },
    mutations: {
      setToken(state,val){
        state.token = val
        Cookie.set ('token',val)
      },
      clearToken(state){
        state.token = ''
        Cookie.remove('token')
      },
      // 要确保刷新之后vuex里面的token是有的
      getToken(state){
        state.token = Cookie.get('token')
      },

      setUsername(state,data){
        state.userId = data
        Cookie.set('userId',data)
      },
      getUsername(state){
        state.userId = Cookie.get('userId')
      }

      // setUsername(state,data){
      //   state.username = data
      //   sessionStorage.setItem('username',data)
      // },
      // getUsername(state){
      //   state.username = sessionStorage.getItem('username')
      // }

     },
    actions: {
    }
}