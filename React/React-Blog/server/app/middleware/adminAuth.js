module.exports = options => {
  return async function adminAuth(ctx, next) {
    console.log(ctx.session.openId, '-------')
    if (ctx.session.openId) {
      await next()
    } else {
      ctx.body = { data: '请先登录!' }
    }
  }
}
