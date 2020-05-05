# Node.js 实现定时爬取微博热搜  
- https://s.weibo.com/top/summary?cate=realtimehot  

依赖支持  
  ```bash
  npm i cheerio superagent -D
  ```
> superagent 是一个轻量级、渐进式的请求库，内部依赖 nodejs 原生的请求 api,适用于 nodejs 环境  
> cherrio 是 nodejs 的抓取页面模块，为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现。适合各种 Web 爬虫程序。node.js 版的 jQuery  

```js
const weiboURL = 'https://s.weibo.com'
const hotSearchURL = weiboURL + '/top/summary?cate=realtimehot'
```

- superagent 发送 get 请求  
  参数：(url, 成功回调(error, 响应体))  
  
- 目标网站页面 DOM 元素分析  
  一系列的 tr 实现  
  遍历每个 tr，将每一项中的热搜地址、热搜内容、热度值、序号、表情等信息 push 进一个空数组中  
  再通过 fs 模块写入 json 文件中  

- 遍历 tr，爬取需要的信息  
  ```js
  superAgent.get(hotSearchURL, (err, res) => {
    if (err) console.err(err)
    const $ = cheerio.load(res.text) // 封装使用 jquery 语法
    let hotList = []
    $('#pl_top_realtimehot table tbody tr').each(function (index) {
      if (index !== 0) {
        const $td = $(this).children.eq(1)
        const link = weiboURL + $td.find('a').attr('href')
        const text = $td.find('a').text()
        const hotValue = $td.find('span').text()
        const icon = $td.find('img').attr('src')
          ? 'https:' + $td.find('img').attr('src')
          : ''
        hotList.push({
          index,
          link,
          text,
          hotValue,
          icon
        })
      }
    })
  })
  ```

- 使用 fs 模块将数组转成 json 字符串写入 hotSearch.json 中  
  ```js
  fs.writeFileSync(
    `${__dirname}/hotSearch.json`,
    JSON.stringify(hotList),
    'utf-8'
  )
  ```

- 请求封装  
  将爬取网站信息封装进 Promise 方便定时实行自动爬取  

- 定时执行  
  `npm i node-schedule -D`  
  node-schedule 用法  
  ```js
  const rule = "30 * * * * *";
  nodeSchedule.scheduleJob(rule, () => {
    
  })
  ```
  6 个占位符依次代表：秒、分、时、日、月、周几  
  20 20 * * * * => 表示每个小时的第20分钟20秒定时执行  
  
