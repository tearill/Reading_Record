// 实现一个 Promise.all
// 接收一个数组，返回一个 Promise
// 所有的 Promise 都 resolve 之后返回，如果有一个 reject 则返回最先 reject 的那个

Promise.myAll = function(promises) {
  let res = [];
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments should be an array'));
    }
    let resolvedCount = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(x => {
        res[i] = x;
        resolvedCount++;
        resolvedCount === promises.length && resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    }
  })
}

// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   });
// })

// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2)
//   }, 1000);
// })

// let p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3)
//   }, 2000);
// })

let p1 = Promise.resolve(1);
let p2 = Promise.reject(2);

Promise.myAll([p1, p2])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));