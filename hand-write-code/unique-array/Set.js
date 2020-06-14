// 数组去重
// Set 实现
// 缺点：不能对嵌套的对象去重
let arr = [1, 1, '1', '1'];

function unique(arr) {
  return [...new Set(arr)];
}

console.log(unique(arr));
// 失效的情况
console.log(unique([1, 1, [2, 3], [2, 3]]));