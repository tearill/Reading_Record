const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

// 监听 connect 事件，注册回调函数
emitter.on('connect', function(username) {
  console.log(username + ' has connected')
})

// 触发 connect 事件，并加上一个参数
emitter.emit('connect', 'Horace')