// ES9 for await
// iterator
// for (value) of: (iteratorAble 可迭代对象) 例如：数组、字符串、Map、Set...
// for (key) in: 对象
let obj = {
  a: 1,
  b: 2,
  // 返回一个符合迭代器协议的对象的无参数函数
  // 必须要有 next 方法
  [Symbol.iterator]: function () { // 给 obj 实现一个迭代器
    let key = ['a', 'b'];
    return {
      next() {
        return {
          done: key.length === 0,
          value: obj[key.shift()]
        }
      }
    }
  }
}
// 只能是遍历可迭代对象的值
// 需要实现 [Symbol.iterator] 接口
for (let value of obj) {
  // console.log(value);
}
// 同步的

function* asyncTask() {
  console.log('1');
  yield new Promise((resolve, reject) => {
    setTimeout(() => { resolve('3s') }, 3000);
  });
  console.log('2');
  yield new Promise((resolve, reject) => {
    setTimeout(() => { resolve('1s') }, 1000);
  });
}

let iterator = asyncTask(); // 调用返回一个迭代器
async function bar() {
  for await (let val of iterator) {
    console.log(val);
  }
}
bar();

// 一系列异步任务 for 循环一次遍历全部运行，for await 可以实现上一个异步任务结束再开始下一个异步任务
async function foo() {
  for await (let val of obj) {
    console.log(val);
  }
}

// foo();

