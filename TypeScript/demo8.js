"use strict";
//! 引用类型 - 字符串
var Horace1 = 'Horace';
var Horace2 = new String('ihorace.cn');
// console.log(Horace1.length, Horace2.length)
//! 引用类型 - Date 类型
// 不传递任何参数
var d = new Date();
// console.log(d.toLocaleString())
// 传递一个整数
var d1 = new Date(1000); // 开始日期 1970-01-01 00:00:00 从开始日期往后数 1000 ms
var d2 = new Date(2000);
// console.log(d1, '----', d2)
// 传递一个字符串
var d3 = new Date('2020/04/21 15:39:00');
var d4 = new Date('2020-04-21 15:39:00');
var d5 = new Date('2020-04-21T15:39:00');
// console.log(d3)
// console.log(d4)
// console.log(d5)
//! 引用类型 - 正则表达式 RegExp
// 构造函数声明
var reg1 = new RegExp("Horace");
console.log(reg1);
var reg2 = new RegExp("Horace", 'gi');
console.log(reg2);
// 字面量声明
var reg3 = /Horace/;
var reg4 = /Horace/gi;
// console.log(reg3, reg4)
// test(string) exec(string)
var reg5 = /Horace/i;
var website = 'ihorace.cn';
var result1 = reg5.test(website);
var result2 = reg5.test(website);
// console.log(result1)
console.log(reg5.exec(website)); // [ 'horace', index: 1, input: 'ihorace.cn', groups: undefined ]
