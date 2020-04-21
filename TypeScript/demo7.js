"use strict";
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
var arr1 = [];
var arr2 = [1, 2, 3, 4, 5];
var arr3 = ['Horace', '20'];
var arr4 = [true, false, false];
// 构造函数赋值法
var arr11 = new Array();
var arr22 = new Array(1, 2, 3, 4, 5);
var arr33 = new Array('Horace', '20');
var arr44 = new Array(true, false, false);
// let arr5: number[] = [1, 2, true] // 报错
// 元组
var x;
x = ['hello', 10];
// x = [10, 'hello'] // 报错 赋值是有顺序的
