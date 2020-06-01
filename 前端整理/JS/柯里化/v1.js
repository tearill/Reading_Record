// 函数柯里化
// 柯里化是将使用多个参数的一个函数转换成一系列使用一个参数的函数
// JavaScript 实际应用中的柯里化函数，可以传递一个或多个参数
//! 作用：参数复用
// 版本 1

function add(a, b) {
  return a + b;
}

function curry(fn, ...arg1) {
  // let args = [].slice.call(arguments, 1); // 截取参数
  return function(...arg2) { // 返回一个新的函数
    let newArgs = arg1.concat(arg2); // 拼接参数并调用
    return fn.apply(this, newArgs);
  }
}

let addTwo = curry(add, 1, 2);
console.log(addTwo()); // 3

let add1 = curry(add, 1);
console.log(add1(3)); // 4

let addCurry = curry(add);
console.log(addCurry(2, 3)); // 5
