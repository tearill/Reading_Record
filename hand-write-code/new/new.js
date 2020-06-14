// 手写一个 new 的实现
// new 实现步骤
// 1. 创建一个新的对象
// 2. 链接原型
// 3. 绑定 this
// 4. 返回一个新对象

function myNew(obj, ...args) {
  if (typeof obj !== 'function') {
    throw new Error('new function, the first parameter must be a function');
  }
  let newObj = {}; // 创建一个全新的对象
  // 对象实例的 __proto__ 指向函数的 prototype
  newObj.__proto__ = obj.prototype; // 链接原型
  const ret = obj.apply(newObj, args); // 绑定 this
  return typeof ret === 'object' ? ret : newObj; // 返回一个新对象
}

function Foo(e) {
  this.name = "Horace";
  this.age = e;
}

console.log(myNew(Foo, 18));
