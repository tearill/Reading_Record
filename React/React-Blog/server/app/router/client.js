module.exports = app => {
  const { router, controller } = app
  router.get('/client/index', controller.client.home.index)
  router.get('/client/getArticleList', controller.client.home.getArticleList)
  router.get('/client/getArticleById/:id', controller.client.home.getArticleById)
  router.get('/client/getTypeInfo', controller.client.home.getTypeInfo)
  router.get('/client/getListById/:id', controller.client.home.getListById)
}
