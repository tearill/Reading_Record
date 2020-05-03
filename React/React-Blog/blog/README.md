# Blog 项目前台  
- Antd 适配  
  `<Col className="comm-left" xs={24} sm={24} md={16} lh={18} xl={14}></Col>`  

- Antd4.0 Icon 引入改变  
  Icon 存在于单独的包内  
  `yarn add @ant-design/icons`  
  ```js
  import {
  ...
  } from '@ant-design/icons'
  ```

- 样式作为共用资源放在 public  
  public  
    -style  
      -components  
      -pages  

- Row + Col 快速搭建两栏布局  

- Breadcrumb 面包屑做导航  

- 封装导航、作者简介、广告、底部等组件作为公用  

- 解析 markdown 语法  
  `yarn add react-markdown`  
  `import ReactMarkdown from 'react-markdown'`  
  页面中直接使用 `<ReactMarkdown />` 标签  
  属性：
    source -> markdown 语法  
    escapeHtml -> 直接输出 html 语法，不解析  

- markdown 导航目录  
  `yarn add markdown-navbar`  
  ```js
  import MarkNav from 'markdown-navbar'
  import 'markdown-navbar/dist/navbar.css'
  ```
  使用 `<MarkNav />` 组件显示 markdown 的目录  
  属性：  
    source -> markdown 的源文件  
    headingTopOffset -> 锚点定位距离顶部的距离  
    ordered -> 是否有编号，默认为 true  

- markdown 目录固定效果  
  使用 `<Affix />` 组件包裹固定目录  

- 向 egg 中间层请求数据  
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

- 重构 markdown 语法解析  
  使用 marked + highlight.js  
  1. renderer: 必填，可以通过自定义的 Renderer 渲染出自定义的格式  
  2. gfm：启动类似 Github 样式的 Markdown，填写 true 或者 false  
  3. pedatic：只解析符合 Markdown 定义的，不修正 Markdown 的错误。填写 true 或者 false  
  4. sanitize: 原始输出，忽略 HTML 标签，这个作为一个开发人员，一定要写 false  
  5. tables： 支持 Github 形式的表格，必须打开 gfm 选项  
  6. breaks: 支持 Github 换行符，必须打开 gfm 选项，填写 true 或者 false  
  7. smartLists：优化列表输出，这个填写 ture 之后，样式会好看很多，所以建议设置成 ture  
  8. highlight: 高亮显示规则，使用 highlight.js 来完成  

- markdown 导航栏重构  
  tocify.tsx  

- 全站支持 markdown  
  
