// 数组展平
// reduce 实现
let arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
}

console.log(flatten(arr));
