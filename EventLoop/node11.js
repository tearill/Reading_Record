setTimeout(() => console.log('timeout1'))

setTimeout(() => {
  console.log('timeout2')
  Promise.resolve().then(() => console.log('promise resolve'))
})

setTimeout(() => console.log('timeout3'))

setTimeout(() => console.log('timeout4'))

// node 10 及之前版本(要考虑定时器时间)
// timeout1
// timeout2
// timeout3
// timeout4
// promise resolve

// node 11 及其之后版本
// timeout1
// timeout2
// promise resolve
// timeout3
// timeout4
