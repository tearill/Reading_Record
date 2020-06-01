// Object.prototype.toString
// When the toString method is called, the following steps are taken:

// 1. If the this value is undefined, return "[object Undefined]".
// 2. If the this value is null, return "[object Null]".
// 3. Let O be the result of calling ToObject passing the this value as the argument.
// 4. Let class be the value of the [[Class]] internal property of O.
// 5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

// let date = new Date();
// console.log(Object.prototype.toString.call(date)) // [object Date]

//! Object.prototype.toString 至少可以判断 12 种类型
// 以下是11种：
let number = 1;              // [object Number]
let string = '123';          // [object String]
let boolean = true;          // [object Boolean]
let und = undefined;         // [object Undefined]
let nul = null;              // [object Null]
let obj = { a: 1 }           // [object Object]
let array = [1, 2, 3];       // [object Array]
let date = new Date();       // [object Date]
let error = new Error();     // [object Error]
let reg = /a/g;              // [object RegExp]
let func = function a() { }; // [object Function]

function checkType() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]))
  }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

// Object.prototype.toString 还能判断 arguments
function a() {
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();

