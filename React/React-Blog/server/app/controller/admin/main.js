'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
  async index() {
    this.ctx.body = 'Hi API'
  }

  // 登录接口
  async checkLogin() {
    let { username, password } = this.ctx.request.body
    console.log(username, password, '----')
    let sql = "SELECT userName FROM admin_user WHERE userName = '" + username +
      "' AND password = '" + password + "'"
    const result = await this.app.mysql.query(sql)
    console.log(result, '-------')
    if (result.length > 0) {
      let openId = new Date().getTime() // 设置 openId
      this.ctx.session.openId = { 'openId': openId } // session 存储登录状态
      this.ctx.body = { 'data': '登录成功', 'openId': openId }
    } else {
      this.ctx.body = { 'data': '登录失败' }
    }
  }
}

module.exports = MainController
