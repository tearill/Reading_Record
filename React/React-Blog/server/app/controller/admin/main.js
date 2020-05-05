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

  // 获取文章分类
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
  }

  // 添加文章
  async addArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId
    }
  }

  // 修改文章
  async updateArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article', tmpArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      isSuccess: updateSuccess
    }
  }

  // 获取文章列表 
  async getArticleList() {
    let sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC'
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      list: result
    }
  }

  // 删除文章
  async delArticle() {
    let id = this.ctx.params.id
    const result = await this.app.mysql.delete('article', { 'id': id })
    this.ctx.body = { data: result }
  }

  // 根据 id 获取文章
  async getArticleById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      'article.article_content as article_content, ' +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as add_time, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName, ' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id = ' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }
}

module.exports = MainController
