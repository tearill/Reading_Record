const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 显示表单页面
    let html = `
      <h1>Horace Koa2 request POST</h2>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br />
        <p>age</p>
        <input name="age" /><br />
        <p>website</p>
        <input name="website" /><br />
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    ctx.body = postData;
    // ctx.body = '接收到 POST 参数';
  } else {
    ctx.body = '<h1>404!</h1>'
  }
})

app.listen(3000, () => {
  console.log('listening on port 3000');
});