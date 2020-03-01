// CommonJS
const { add, mul } = require('./js/mathUtils')

console.log(add(20, 30))
console.log(mul(20, 30))

//ES6 模块化
import { name, age, height } from './js/info'

console.log(name)
console.log(age)
console.log(height)

// 依赖 css 文件
require('./css/normal.css')

// 依赖 less 文件
require('./css/special.less')

document.writeln('<h2>hello</h2>')