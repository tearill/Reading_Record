// EmptyObject
// 判断是否为空对象

function isEmptyObject(obj) {
  for (const key in obj) { // 如果有内容
    return false;
  }
  return true;
}

console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true
console.log(isEmptyObject({ name: 'Horace' })); // false