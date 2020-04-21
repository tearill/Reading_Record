//! 引用类型 - 字符串
let Horace1: string = 'Horace'
let Horace2: String = new String('ihorace.cn')
// console.log(Horace1.length, Horace2.length)

//! 引用类型 - Date 类型
// 不传递任何参数
let d: Date = new Date()
// console.log(d.toLocaleString())

// 传递一个整数
let d1: Date = new Date(1000) // 开始日期 1970-01-01 00:00:00 从开始日期往后数 1000 ms
let d2: Date = new Date(2000)
// console.log(d1, '----', d2)

// 传递一个字符串
let d3: Date = new Date('2020/04/21 15:39:00')
let d4: Date = new Date('2020-04-21 15:39:00')
let d5: Date = new Date('2020-04-21T15:39:00')
// console.log(d3)
// console.log(d4)
// console.log(d5)

//! 引用类型 - 正则表达式 RegExp
// 构造函数声明
let reg1: RegExp = new RegExp("Horace")
console.log(reg1)
let reg2: RegExp = new RegExp("Horace", 'gi')
console.log(reg2)

// 字面量声明
let reg3: RegExp = /Horace/
let reg4: RegExp = /Horace/gi
// console.log(reg3, reg4)

// test(string) exec(string)
let reg5: RegExp = /Horace/i
let website: string = 'ihorace.cn'
let result1: boolean = reg5.test(website)
let result2: boolean = reg5.test(website)
// console.log(result1)
console.log(reg5.exec(website)) // [ 'horace', index: 1, input: 'ihorace.cn', groups: undefined ]