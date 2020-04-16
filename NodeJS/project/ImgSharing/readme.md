# 图片分享小圈子  
- 使用  
  > nodemon app.js  

- 采用的中间件  
  express-handlebars // 渲染用户界面的模板引擎  
  body-parser // 解析请求  
  cookie-parser  
  morgan // 日志  
  method-override  
  errorhandler // 发生错误打印调用栈  

- 模板引擎采用 handlebars -> 与 HTML 相似，易上手  

- 项目分层  
  1. middlewares -> 中间件层，开启中间件  
  2. controllers -> 控制器  
  3. routes -> 路由  
  4. views -> 模板 ----- 视图层参考 Hexo 的架构模板  
    image.handlebars -> image 页面模板  
    index.handlebars -> index 页面模板  
    layouts -> 存放整站模板  
    partials -> 存放页面共享模板  
    布局样式采用 bootstrap  

- moment 时间库  
  时间格式转换  
  便于实现显示 '...之前' 的效果  