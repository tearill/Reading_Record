// 类型判断最常用方式：typeof
// 基本数据类型：number, string, boolean, null, undefined, symbol, bigint

console.log(typeof 1); // number
console.log(typeof "Horace"); // string
console.log(typeof true); // boolean
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof Symbol('Horace')); // symbol
console.log(typeof 10n); // bigint

// 复杂数据类型：对象
console.log(typeof {}); // object

// typeof 可以检测函数
function fun() {}
console.log(typeof fun); // function

//! typeof 可以检测的类型：number, string, boolean, undefined, symbol, bigint, function (7 种)