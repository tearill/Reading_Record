const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  let url = ctx.url;
  // 从 request 中接收 get 请求
  let request = ctx.request;
  let req_requery = request.query;
  let req_requeryString = request.querystring;

  // 从上下文中直接获取 get 请求
  let ctx_query = ctx.query;
  let ctx_queryString = ctx.querystring;

  ctx.body = {
    url,
    req_requery,
    req_requeryString,
    ctx_query,
    ctx_queryString
  }
})

app.listen(3000, () => {
  console.log('listening on port 3000');
});