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

- 中间层与后台的结合  
  登录实现  
  中间层配置登录验证接口路由  
  根据输入的用户名和密码请求数据库得到返回  
  前端 axios 携带数据请求接口  
  根据返回的数据进行判断和跳转  

  跨域设置  
  请求后端接口导致跨域问题  
  ```js
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*'] // 域名白名单
  }

  config.cors = {
    origin: 'http://localhost:3001',
    credentials: true, // 允许 cookie 可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  ```

- 中台路由守卫  
  防跳墙，防止未登录进入  
  编写中间件实现 middleware/adminAuth.js  
  ```js
  module.exports = options => {
    return async function admin(ctx, next) {
      console.log(ctx.session.openId, '-------')
      if (ctx.session.openId) {
        await next()
      } else {
        ctx.body = { data: '请先登录!' }
      }
    }
  }
  ```
  