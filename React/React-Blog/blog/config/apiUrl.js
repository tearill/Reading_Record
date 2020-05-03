let ipUrl = 'http://127.0.0.1:7001/client/'

let servicePath = {
  getArticleList: ipUrl + 'getArticleList', // 首页
  getArticleById: ipUrl + 'getArticleById/', // 文章详情
  getTypeInfo: ipUrl + 'getTypeInfo', // 文章类别
  getListById: ipUrl + 'getListById/', // 根据类别 ID 获取文章列表
}

export default servicePath
