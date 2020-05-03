# Blog 项目 server 中间层  
- Egg.js 搭建  

- 目录结构和约定规范  
  1. app 最主要的文件  
    controller 服务端控制器目录  
    public 共用文件目录(静态资源等)  
    router.js 路由配置文件  
    service 业务封装  
    view 模板文件  
    extend 扩展方法  
    middleware 中间件  
  2. config 配置文件  
  3. logs 日志文件  
  4. run 运行时生成的配置文件，基本不会修改  
  5. test 测试使用的配合文件  
  6. .autod.conf.js 自动生成的配置文件  

- RESTful 风格  
  简单和约束性  
  请求方式 get 获取资源 post 新建资源 put 更新资源 delete 删除资源  

- 控制器前后台分离  
  admin 后台管理的控制器  
  client 前台所有的控制器  

  路由前后台分离  
  router.js 总路由  
  router 目录下  
    admin.js 后台路由  
    client.js 前台路由  

- 连接 mysql 数据库  
  使用 egg-mysql 连接  
  配置 config/plugin.js 和 config/config.default.js  

- 建立数据表  

- 前端数据请求  
  ```js
  Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
      axios('http://127.0.0.1:7001/client/getArticleList')
        .then(res => {
          console.log(res.data, '-----------')
          resolve(res.data)
        })
    })
    return await promise
  }
  ```

- 跨域问题  
  1. `yarn add egg-cors`  
  2. 配置 config/plugin.js，开启跨域中间件  
    ```js
    exports.cors = {
      enable: true,
      package: 'egg-cors'
    }
    ```
  3. 配置 config/config.default.js  
    ```js
    config.security = {
      csrf: {
        enable: false
      },
      domainWhiteList: ['*'] // 域名白名单
    }

    config.cors = {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
    ```

