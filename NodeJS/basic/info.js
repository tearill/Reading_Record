const os = require('os') // 内置的 os 模块，提供了一些基本的系统操作函数

function printProgramInfo() {
  console.log('当前用户', os.userInfo().username)
  console.log('当前进程 ID', process.pid)
  console.log('当前脚本路径', __filename)
}

module.exports = printProgramInfo