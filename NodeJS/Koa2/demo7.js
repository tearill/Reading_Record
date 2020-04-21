const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();

let home = new Router();
home.get('/horace', async (ctx, next) => {
  ctx.body = 'Home Horace Page';
});
home.get('/todo', async (ctx, next) => {
  ctx.body = 'Home todo Page';
});

let page = new Router();
page.get('/horace', async (ctx, next) => {
  ctx.body = 'Page Horace Page';
});
page.get('/todo', async (ctx, next) => {
  ctx.body = 'Page todo Page';
});

// 父级路由
let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on port 3000');
})