// 偏函数
// 版本 2 
// 实现占位符
let _ = {};

function partial(fn, ...args) {
  return function () {
    let position = 0, len = args.length;
    for (let i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]; // 遇到占位符向后走
    }
    while (position < arguments.length) args.push(arguments[position++]); // 补上参数
    return fn.apply(this, args);
  }
}

var subtract = function (a, b) { return b - a; };
subFrom20 = partial(subtract, _, 20);
console.log(subFrom20(5));
