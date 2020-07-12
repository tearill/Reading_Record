// 函数柯里化  
// 判断一个元素的类型

// 1. typeof 不能区分对象类型
// 2. constructor 可以判断这个实例是通过谁来构造出来的
// 3. instanceof 区分实例 __proto__
// 4. Object.prototype.toString.call() 区分具体的类型 (不能区分实例)

// function isType(content, typing) {
//   return Object.prototype.toString.call(content) === `[object ${typing}]`;
// }
// 用户传递参数的时候出错导致结果出现问题
// console.log(isType('Hello', 'String'));
// console.log(isType(123, 'Number'));

// 细化函数功能, 让函数变得更具体(柯里化的作用)
// const isType = (typing) => (value) => {
//   return Object.prototype.toString.call(value) === `[object ${typing}]`;
// }

// let util = {};
// ['String', 'Number', 'Null', 'Undefined'].forEach((typing) => {
//   util['is' + typing] = isType(typing);
// })

// console.log(util.isString('123'));
// console.log(util.isNumber(123));

// 通用的函数柯里化  
function sum(a, b, c, d) {
  console.log(a, b, c, d);
}

const currying = (fn, arr = []) => { // 记录调用时参数个数 和 函数个数的关系
  let len = fn.length; // 函数的参数个数
  // console.log(len);
  return (...args) => {
    let concatArgs = [...arr, ...args];
    // 获取长度和值的关系
    // 传递的参数不够, 再返回一个柯里化函数
    if (concatArgs.length < len) { // 递归
      return currying(fn, concatArgs);
    } else {
      return fn(...concatArgs);
    }
  }
}

let newSum = currying(sum);

newSum(1, 2)(3)(4);

// 柯里化类型判断
function isType(typing, content) {
  return Object.prototype.toString.call(content) === `[object ${typing}]`;
}

let util = {};
['String', 'Number', 'Null', 'Undefined'].forEach((typing) => {
  util['is' + typing] = currying(isType)(typing);
})

console.log(util.isString('123'));
console.log(util.isNumber(123));
