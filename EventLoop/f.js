setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
})

//! 两种情况都有可能，顺序取决于 node 的准备时间
// setTimeout
// setImmediate

// setImmediate
// setTimeout