const Koa = require('koa')
const router = require('koa-router')()
const axios = require('axios')
const queryString = require('querystring')

const clientId = '928313cbcbf5a97567e6'
const clientSecret = 'bcda5d46dd4716d89107723a8ce227e5ffb8179d'

const app = new Koa()

router.get('/', async (ctx) => {
  ctx.body = `
    <h1>Github</h1>
    <a href="/github/login">Github 登录</a>
  `
})

router.get('/github/login', async (ctx) => {
  let url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
  ctx.redirect(url) // 重定向到 github 的认证接口
})

router.get('/github/callback', async (ctx) => {
  const code = ctx.query.code
  // 通过 code 获取 access_token
  let res = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  })
  let access_token = queryString.parse(res.data).access_token
  // 使用 access_token 获取用户信息
  let user_info = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
  let {login, avatar_url, bio, html_url} = user_info.data

  ctx.body = `
    <h2>${login}，欢迎登录</h2>
    <img width="50" src="${avatar_url}" />
    <p>简介：${bio}</p>
    <p>Github 主页：${html_url}</p>
    <p>所有信息：${JSON.stringify(user_info.data, null, 4)}</p>
  `
})

app.use(router.routes()).use(router.allowedMethods)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})