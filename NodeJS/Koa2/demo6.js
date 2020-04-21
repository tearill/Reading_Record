const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Horace';
})

router.get('/todo', (ctx, next) => {
  ctx.body = 'Todo page';
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on port 3000');
})