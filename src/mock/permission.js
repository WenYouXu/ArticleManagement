import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { userId, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (userId === 'admin' || userId === 'hhh') {
      // 判断账号和密码是否对应
      if (userId === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home'
              },
              {
                path: '/page',
                name: 'page',
                label: '文章管理',
                icon: 'document',
                url: 'PageManage'
              },
              {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage'
              },
              {
                label: '其他',
                icon: 'fold',
                children: [
                  {
                    path: '/other1',
                    name: 'other1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Other1'
                  },
                  {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: ''
                  }
                ]
              }
            ],
            userId:'admin',
            // guid 返回的是一串字符串可以当作是token来使用
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (userId === 'hhh' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home'
              },
              {
                path: '/page',
                name: 'page',
                label: '文章管理',
                icon: 'document',
                url: 'PageManage'
              },
            ],
            userId:'hhh',
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
