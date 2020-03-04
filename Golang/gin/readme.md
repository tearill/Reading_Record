# gin  
- Go 的 web 开发框架  
- 对比 node 和 C 进行学习  

## gin 初探  

1. 起步  
   import("github.com/gin-gonic/gin") --- node 中的 require('express')/('koa')  
2. 初始化引擎框架  
   engine := gin.Default() --- node 中的 const app = express/new koa()  
3. http 请求  
   engine.GET/POST/...('url', func(context *gin.Context) {}) --- 请求的方法  
   url：请求的路由  
   func：请求执行的回调函数  
   context：*gin.Context 指针类型，上下文 --- node koa 中的 ctx || express 中的 (req, res)  
4. 监听窗口  
   engine.Run(":3000") --- node 中的 app.listen(3000)  



## http 请求方式  

1. GET 获取信息  
2. POST 添加/保存/上传信息  
3. PUT 修改信息  
4. PATCH 局部更新  
5. DELETE 删除请求  
6. HEAD 不需要响应体，只获取响应头  
7. OPTIONS 测试目的资源所支持的所有通信请求方法  
   在不获取资源的情况下，了解资源的信息(比如文件大小、是否存在、是否修改过)  