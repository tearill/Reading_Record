// 利用 reduce 函数实现数组展平

let arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
}

console.log(flatten([[1, 2, 3], [4, 5]]));
console.log(flatten(arr));
