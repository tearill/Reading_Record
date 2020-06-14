// 手写一个 bind
// 返回一个新的函数，this 指向第一个参数
// 1. 拷贝源函数
  // - 通过变量存储源函数
  // - Object.create 复制源函数的 prototype
// 2. 将其返回
// 3. 调用时候的区别
// new 调用？普通函数的调用？

Function.prototype.myBind = function(objThis, ...arg1) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to bound is not callable');
  }
  const fn = this; // 调用 bind 的函数
  function innerFunc(...arg2) {
    const isNew = this instanceof innerFunc; // 是否为 new 调用
    // 使用 Object 转换成包装类 => 考虑第一个参数传递基本数据类型的情况
    const context = isNew ? this : Object(objThis);
    return fn.apply(context, arg1.concat(arg2));
  }
  if (fn.prototype) {
    innerFunc.prototype = Object.create(fn.prototype);
  }
  return innerFunc;
}

const sum = (a, b, c) => {
  return a + b + c;
}

let testSum = sum.bind(null, 10);
let sum10 = sum.myBind(null, 10);

console.log(testSum(10, 20));
console.log('-------------------');
console.log(sum10(10, 20));