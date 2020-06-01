// plainObject
// 纯粹的对象 => 该对象是通过 {} 或 new Object() 创建的
// 一个没有原型的对象也是一个纯粹的对象

// 上节中写 type 函数时，用来存放 toString 映射结果的对象
let class2type = {};

// 相当于 Object.prototype.toString
let toString = class2type.toString;

// 相当于 Object.prototype.hasOwnProperty
let hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  let proto, Ctor; // 原型、构造函数

  // 排除掉明显不是 obj 的以及一些宿主对象如 Window
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj);

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true;
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

function Person(name) {
  this.name = name;
}

console.log(isPlainObject({})); // true
console.log(isPlainObject(new Object)); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject(Object.assign({a: 1}, {b: 2}))); // true
console.log(isPlainObject(new Person('Horace'))); // false
console.log(isPlainObject(Object.create({}))); // false
