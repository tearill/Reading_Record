// 实现一个深拷贝
// 考虑对象相互引用以及 Symbol 拷贝的情况

function deepClone(obj) {
  let cloneObj; // 克隆对象
  
  if (obj === null) { // 为 null 的情况
    return obj;
  }

  let type = typeof obj;

  // 基本数据类型
  switch (type) {
    case 'number':
    case 'string':
    case 'boolean':
    case 'undefined':
      return obj;
  }

  // 复杂数据类型
  if (Array.isArray(obj)) { // 数组
    cloneObj = [];
    obj.forEach((item) => {
      cloneObj.push(item);
    })
  } else { // 对象
    cloneObj = {};
    // object | symbol
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      Object.getOwnPropertyNames(obj) // 自身属性连接上 Symbol 类型
        .concat(Object.getOwnPropertySymbols(obj))
        .forEach(item => {
          cloneObj[item] = deepClone(obj[item]);
        })
    } else { // 其他的对象，例如：RegExp、Date
      cloneObj = obj;
    }
  }
  return cloneObj;
}

let a = { 
  a: '1', 
  b: [1, 2, 3, 4, { t: 'test' }], 
  [Symbol()]: 'symbol', 
  d: new Date(), 
  r: RegExp('^\\d$')
}

console.log(deepClone(a));
