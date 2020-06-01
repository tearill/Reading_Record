// 函数柯里化
// 版本 2

function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

function _curry(fn, len, ...args) {
  return function (...params) {
    let allArgs = [...args, ...params];
    if (allArgs.length < len) { // 参数不够
      return _curry.call(this, fn, len, ...allArgs); // 递归自身直到参数够了为止
    } else {
      return fn.apply(this, allArgs);
    }
  }
}

var fn = curry(function (a, b, c) {
  return [a, b, c];
});

console.log(fn("a", "b", "c")); // ["a", "b", "c"]
console.log(fn("a", "b")("c")); // ["a", "b", "c"]
console.log(fn("a")("b")("c")); // ["a", "b", "c"]
console.log(fn("a")("b", "c")); // ["a", "b", "c"]
