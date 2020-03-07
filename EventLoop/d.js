console.log('script start')

setTimeout(() => {
  console.log('setTiemout')
}, 0)

Promise
  .resolve()
  .then(() => {
    console.log('promise1')
    return Promise.resolve(111)
  })
  .then((val) => {
    console.log(val)
    console.log('promise1-2')
  })

Promise
  .resolve()
  .then(() => {
    setTimeout(() => {
      console.log('promise2')
    }, 0)
  })
  .then(() => {
    console.log('promise2-2')
  })

console.log('script end')

// script start
// script end
// promise1
// promise2-2
// 111
// promise1-2
// setTiemout
// promise2

//! 立即 resolve 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时
//! 所以 promise2-2 会在 111 和 promise1-2 之前输出