// 实现一个 Promise.race
// 返回最先 resolve 的那个，不管是 resolve 还是 reject

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (promise in promises) { // 使用 for..in，因为它是无序的 
      if (typeof promise === 'object' && typeof promise.then === 'function') {
        // 数组传进来的项是一个 Promise 实例，执行 then 方法。
        // resolve 只有一个，哪个实例对象最先执行完就会使用这个 resolve
        promise.then(resolve, reject);
      } else {
        // 不是 Promise 实例对象直接返回当前值
        resolve(promise);
      }
    }
  })
}

let p1 = Promise.resolve(1);
let p2 = Promise.reject(2);

Promise.myRace([p1, p2])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  