// 创建异步任务
function makeAsync(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

// 三个异步任务
let task1 = makeAsync(1000);
let task2 = makeAsync(2000);
let task3 = makeAsync(3000);

// 三个异步任务串行，执行完上一个再继续下一个
makeAsync(1000).then(() => {
  console.log('1s');
  return makeAsync(2000);
})
.then(() => {
  console.log('2s');
  return makeAsync(3000);
})
.then(() => {
  console.log('done');
})

// 1: 迭代器协议
// 2: 额外的方法来生成：generator
async function foo() {
  // [makeAsync(1000), makeAsync(2000), makeAsync(3000)] 定义的时候立马就生成了 Promise
  for await (let v of [makeAsync(1000), makeAsync(2000), makeAsync(3000)]) {
    // v 就是 Promise resolve 出来的值
    console.log(v);
  }
}
// foo();

function* gen() {
  // yield 特性：不是立即执行
  yield makeAsync(1000);
  yield makeAsync(2000);
  yield makeAsync(3000);
}
let task = gen(); // 生成迭代器函数，分步执行 yield 语句
async function bar() {
  // yield 返回了 promise，所以 for await 等待 promise 结束才会运行下一个异步任务
  for await (let v of task) {
    console.log(v);
  }
}
bar();
