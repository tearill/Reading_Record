// 实现一个 instanceof
// 原理：基于原型链的查找
// 例如：[1] instanceof Array
// 右边函数的 prototype 在左边对象的原型链上
// 遍历左边对象的__proto__，直到找到右边函数的 prototype

function myInstanceof (left, right) {
  // 基本数据类型直接返回 false 
  if (typeof left !== 'object' || left === null) return false;
  // getPrototypeOf 拿到对象的原型
  let proto = Object.getPrototypeOf(left);
  while(true) {
    if(proto == null) return false; // 找到了原型链最顶端还没找到
    if(proto == right.prototype) return true; // 找到了相同的原型对象
    proto = Object.getPrototypeOf(proto); // 继续向上查找原型链
  }
}

console.log(myInstanceof('111', String)); // false
console.log(myInstanceof(new String('111'), String)); // true
console.log(myInstanceof('string', Object)); // false
console.log(myInstanceof(() => {}, Function)); // true
