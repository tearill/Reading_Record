// 手写一个 call

Function.prototype.myCall = function(objThis, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  objThis = Object(objThis) || window;
  objThis.fn = this; // 调用 call 的函数
  let result = objThis.fn(...args);
  // let result = eval('objThis.fn(..args)');
  delete objThis.fn; // 调用完成之后删除
  return result;
}

let foo = {
  value: 1
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
bar.call(foo);
bar.myCall(foo); // 1
console.log('--------------');

bar.call(foo, 'Horace', 18)
bar.myCall(foo, 'Horace', 18); // Horace 18 1
console.log('--------------');

var value = 2;
let obj = {
  value: 1
}

function baz(name, age) {
  // console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  };
}

baz.call(null);
baz.myCall(null);
console.log('--------------')

console.log(baz.call(obj, 'Horace', 18));
console.log(baz.myCall(obj, 'Horace', 18));
