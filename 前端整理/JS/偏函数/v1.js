// 偏函数
// 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
// 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
// 版本 1

function partial(fn, ...arg1) {
  return function (...arg2) {
    return fn.apply(this, arg1.concat(arg2));
  }
}

var value = 1;
function add(a, b) {
  return a + b + this.value;
}

var addOne = partial(add, 1);
// let addOne = add.bind(null, 1);
console.log(addOne(2)); // 3

var obj = {
  value: 2,
  addOne: addOne
}

// console.log(obj);
console.log(obj.addOne(2)); 
// partial: 5
// bind: 
