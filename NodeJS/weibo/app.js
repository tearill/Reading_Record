const cheerio = require('cheerio')
const superAgent = require('superagent')
const fs = require('fs')
const weiboURL = 'https://s.weibo.com'
const hotSearchURL = weiboURL + '/top/summary?cate=realtimehot'
const nodeSchedule = require('node-schedule')

function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superAgent.get(hotSearchURL, (err, res) => {
      if (err) console.err(err)
      const $ = cheerio.load(res.text) // 封装使用 jquery 语法
      let hotList = []
      $('#pl_top_realtimehot table tbody tr').each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1)
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
    hotList.length ? resolve(hotList) : reject("error");
  })
}

const rule = "30 * * * * * *"
nodeSchedule.scheduleJob("30 * * * * * *", async () => {
  // console.log(new Date())
  try {
    const hotList = await getHotSearchList();
    // 写入文件
    fs.writeFileSync(
      `${__dirname}/hotSearch.json`,
      JSON.stringify(hotList),
      'utf-8'
    )
  } catch (error) {
    console.error(error)
  }
})

