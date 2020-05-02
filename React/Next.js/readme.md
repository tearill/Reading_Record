# Next.js  
- SPA
- React Vue 单一页面，首屏加载过慢，不能 SEO  
- Next.js SSR 优点：  
  1. 搭建轻松  
  2. 自带数据同步 SSR  
  3. 丰富插件，自己形成生态  
  4. 灵活配置  

- 搭建方式  
  1. 手动，自己配置  
  2. create-next-app  

- 路由  
  pages 下文件名就是对应的路由  

- 嵌套路由  
  嵌套文件夹的形式展示  

- 路由跳转  
  1. `<Link>` 标签 页面(中间必须加一个 a 标签)  
  2. Router.push 方法  

- 路由跳转使用 query 传递参数和接收参数  
  `<Link href="/find?name=悟空"><a>找悟空</a></Link>`  
  ```js
  Router.push({
    pathname: '/find',
    query: { name: '悟空' }
  })
  ```
  ```js
  Router.push('/find?name=悟空')
  ```

- 路由的钩子函数  
  1. routeChangeStart: 路由将要发生变化  
  2. routeChangeComplete: 路由变化完成  
  3. beforeHistoryChange: History 路由发生将要发生变化  
  4. routeChangeError: 路由变化发生错误的时候  
  5. hashChangeStart: Hash 路由将要发生变化  
  6. hashChangeComplete: Hash 路由变化完成  

- style css  

- Lazy Loading  模块 moment 组件懒加载  
  dynamic 动态 import  

- 自定义 Head 实现 SEO 优化  

- yarn add @zeit/next-css  
  支持 css 引入  

- yarn add babel-plugin-import  
  按需加载  

- 打包的坑  
  