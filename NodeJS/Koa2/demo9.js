const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'myName', 'Horace', {
        domain: '127.0.0.1',
        // path: '/index',
        maxAge: 1000 * 60 * 60 * 24,
        expires: new Date('2020-04-22'),
        httpOnly: false,
        overwrite: false
      }
    );
    ctx.body = 'Cookie is ok';
  } else {
    if (ctx.cookies.get('myName')) {
      ctx.body = ctx.cookies.get('myName');
    } else {
      ctx.body = 'Cookie is None';
    }
    // ctx.body = 'Hello';
  }
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})