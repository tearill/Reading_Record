// 发布订阅模式
// 实现异步并发获取最终结果(计数器, 调用的成功个数达到了预期就执行对应的结果)

// 异步的解决方案 => 回调
const fs = require('fs');
let obj = {};
// let index = 2;
// function out() {
//   if (index === Object.keys(obj).length) {
//     console.log(obj);
//   }
// }

const after = (times, callback) => () => {
  --times == 0 && callback();
}

let out = after(2, () => {
  console.log(obj);
});

fs.readFile('./name.txt', 'utf8', (err, data) => {
  // console.log(data);
  obj.name = data;
  out();
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  // console.log(data);
  obj.age = data;
  out();
})

// render();
