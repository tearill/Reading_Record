console.time('start')

setTimeout(() => {
  console.log(2)
}, 10)

setImmediate(() => {
  console.log(1)
})

new Promise((resolve, reject) => {
  console.log(3)
  resolve()
  console.log(4)
})
.then(() => {
  console.log(5)
  console.timeEnd('start')
})
console.log(6)

process.nextTick(() => {
  console.log(7)
})

console.log(8)