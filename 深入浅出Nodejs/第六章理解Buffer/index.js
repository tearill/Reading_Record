var str = '深入浅出node.js'
var buffer1 = Buffer.from(str, 'utf-8')
console.log(buffer1)

var buffer2 = Buffer.alloc(100)
console.log(buffer2.length)
console.log(buffer2[50])
buffer2[40] = -1000 // 小于 0 的话逐次加 256，直到得到 0-255 区间内的数值 => 24
buffer2[50] = 1000 // 大于 255 的话逐次减 256，直到得到 0-255 区间内的数值 => 232
buffer2[60] = 3.1415 // 如果是小数，舍弃小数部分 => 3
console.log(buffer2[40])
console.log(buffer2[50])
console.log(buffer2[60])

var buffer3 = Buffer.alloc(8)
console.log(buffer3)

var buffer4 = Buffer.alloc(10, 0, 'base64')
console.log(buffer4)