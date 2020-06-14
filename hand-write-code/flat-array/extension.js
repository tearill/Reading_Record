// 数组展平
// 扩展运算符实现
let arr = [1, [2, [3, 4]]];

function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr); // 只要还有数组，继续扩展连接
  }
  return arr;
}

console.log(flatten(arr));
