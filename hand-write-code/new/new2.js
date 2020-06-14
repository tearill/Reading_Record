// 手写一个 new 的实现

function myNew(obj, ...args) {
  if (typeof obj !== 'function') {
    throw new Error('new function, the first parameter must be a function')
  }
  let newObj = Object.create(obj.prototype); // 创建对象并进行原型链接
  const ret = obj.apply(newObj, args); // 绑定 this
  return typeof ret === 'object' ? ret : newObj; // 返回一个新对象
}

function Foo(e) {
  this.name = "Horace";
  this.age = e;
}

console.log(myNew(Foo, 18));
