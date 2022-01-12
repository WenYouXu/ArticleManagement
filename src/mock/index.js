import Mock from 'mockjs'
import userApi from './user'
import permissionApi from './permission'
import editorApi from './editor'
import loginApi from './login'

// 设置200-1000毫秒延时请求数据
Mock.setup({
  timeout: '200-1000'
})

// 登录相关
Mock.mock(/\/login\/postUserList/, 'post', loginApi.postUserList)


// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)


// 编辑器相关
Mock.mock(/\/editor\/getEditor/, 'get', editorApi.getEditorList)
Mock.mock(/\/editor\/del/, 'get', editorApi.deleteEdit)
Mock.mock(/\/editor\/save/, 'post', editorApi.saveEdit)

// 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
