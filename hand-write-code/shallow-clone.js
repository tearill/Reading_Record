// 实现一个浅拷贝

function shallowClone(obj) {
  if (typeof obj === 'object' && obj !== null) { // 判断是不是对象
    const cloneObj = Array.isArray ? [] : {};
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) { // 判断是否为自身的属性
        cloneObj[prop] = obj[prop]; // 依次简单赋值
      }
    }
    return cloneObj;
  } else {
    return obj; // 不是对象的情况下直接简单复制
  }
}

