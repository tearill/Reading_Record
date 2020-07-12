const fs = require('fs');

// 发布和订阅之间没有任何的联系
let event = {
  _arr: [],
  on(fn) { // 订阅事件
    this._arr.push(fn);
  },
  emit() { // 发布事件
    this._arr.forEach(fn => fn());
  }
}

let obj = {};
// 先订阅再触发, 订阅和发布之间没有关联, 可以用来解耦操作
event.on(function () { // 计划一
  console.log('数据来了');
})

event.on(function () { // 计划二
  if (Object.keys(obj).length === 2) {
    console.log(obj);
  }
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
  obj.name = data;
  event.emit(); // 发布
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  obj.age = data;
  event.emit(); // 发布
})

// 