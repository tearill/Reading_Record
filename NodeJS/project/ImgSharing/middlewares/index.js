const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars'); // 渲染用户界面的模板引擎
const bodyParser = require('body-parser'); // 解析请求
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // 日志
const methodOverride = require('method-override'); //? 兼容请求
const errorHandler = require('errorhandler'); // 发生错误打印调用栈

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('secret-value'));
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  if (app.get('env' === 'development')) {
    app.use(errorHandler());
  }
  
  return app;
}