import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      position: '@cword(3,5)',
      tag:'@cword(2,5)',
      title: '@cword(3,15)',
      status:'@boolean',
      text:'@paragraph',
      img:'@dataImage(78x78)',
      date: Mock.Random.date(),
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 title, page, limt; title可以不填, page,limit有默认值。
   * @param title, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getEditorList: config => {
    const { title, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + title, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(editor => {
      if (title && editor.position.indexOf(title) === -1 && editor.title.indexOf(title) === -1 && editor.tag.indexOf(title)===-1 && editor.date.indexOf(title) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  
  /**
   * 删除
   * @param id
   * @return {*}
   */
  deleteEdit: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },

/**
   * 保存/添加新的文章
   * @param title,text,image
   * @return {{code: number, data: {message: string}}}
   */
  saveEdit:config =>{
    const { position,date,tag,title,text,image } = JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    List.unshift({
        id: Mock.Random.guid(),
        tag:tag,
        title:title,
        text: text,
        image:image,
        position:position,
        date:date
      })
      return {
        code: 20000,
        data: {
          message: '保存成功'
        }
      }
  }


 
  }