import Cookie from 'js-cookie'
export default {
    state: {
        menu:[],
        currentMenu:null,
        
    },
    mutations: {
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
            console.log(val,'vuex');
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu = [
                {
                    path:'/',
                    component: () => import('@/views/Main'),
                    children:[]
                }
            ]
            menu.forEach(item =>{
                if(item.children){
                    item.children = item.children.map(item =>{
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                }else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            // console.log(currentMenu,'cur');
            router.addRoutes(currentMenu)
        },
        
        // selectMenu(state,val){
        //     val.name==='home'?  (state.currentMenu = null) :  (state.currentMenu = val)
        // }
        selectMenu(state,val){
         state.currentMenu = val
        }
    },
    actions: {
    }
}