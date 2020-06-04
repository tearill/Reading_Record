function add(a, b) {
  return a + b;
}

function curry(fn, ...arg1) {
  return function(...arg2) {
    return fn.apply(this, arg1.concat(arg2));
  }
}

let add10 = curry(add, 10);

console.log(add10(10));
