// 引用类型 - 数组

// let obj = {
//   name: 'Horace',
//   website: 'ihorace.cn',
//   age: 20,
//   saySomething: function() {
//     console.log('为了前端技术')
//   }
// }

// console.log(obj.name)
// obj.saySomething()

// 数组 --- 引用类型 array String Date RegExp
// let arr1: number[]
// let arr2: Array<string>

// 字面量赋值法
let arr1: number[] = []
let arr2: number[] = [1, 2, 3, 4, 5]
let arr3: Array<string> = ['Horace', '20']
let arr4: Array<boolean> = [true, false, false]

// 构造函数赋值法
let arr11: number[] = new Array()
let arr22: number[] = new Array(1, 2, 3, 4, 5)
let arr33: Array<string> = new Array('Horace', '20')
let arr44: Array<boolean> = new Array(true, false, false)

// let arr5: number[] = [1, 2, true] // 报错

// 元组
let x: [string, number]
x = ['hello', 10]
// x = [10, 'hello'] // 报错 赋值是有顺序的