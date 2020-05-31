// 使用扩展运算符实现数组展平
let arr = [1, [2, [3, 4]]];
// 只能展平一层
console.log([].concat(...arr)); // [1, 2, [3, 4]]

function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

console.log(flatten([[1, 2, 3], [4, 5]]));
console.log(flatten(arr));
