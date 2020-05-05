let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', // 登录检测
  getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类别信息
  addArticle: ipUrl + 'addArticle', // 添加文章
  updateArticle: ipUrl + 'updateArticle', // 修改更新文章
  getArticleList: ipUrl + 'getArticleList', // 文章列表
  delArticle: ipUrl + 'delArticle/', // 删除文章
  getArticleById: ipUrl + 'getArticleById/', // 根据 id 获取文章所有的信息
}

export default servicePath
