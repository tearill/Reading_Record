const commander = require('commander')
const ora = require('ora') // 用于显示加载提示的 npm 包
const printProgramInfo = require('./info')
// const datetime = require('./datetime')
const getCurrentTime = require('./datetime')

// const waitTime = Number(process.argv[3])
// const message = process.argv[5]

commander
  .option('-t --time <number>', '等待时间(秒)', 3)
  .option('-m, --message <string>', '要输出的信息', 'Hello, Horace')
  .parse(process.argv)

setTimeout(() => {
  // console.log('Hello')
  spinner.stop()
  console.log(commander.message)
// }, 3000)
// }, waitTime * 1000)
}, commander.time * 1000)

process.on('exit', () => {
  console.log('See you next time!')
})

printProgramInfo()
// console.log('当前时间', datetime.getCurrentTime())
console.log('当前时间', getCurrentTime())
const spinner = ora('正在加载中，请稍后...').start() // 加载提示