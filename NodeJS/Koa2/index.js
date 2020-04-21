const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  ctx.body = 'Hello Horace'
})

app.listen(3000, () => {
  console.log('listening on port 3000');
});