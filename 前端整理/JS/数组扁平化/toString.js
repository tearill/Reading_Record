// 如果元素都是数组，可以考虑使用 toString 方法转成字符串
// 再将字符串拼接成数组

let arr = [1, [2, [3, 4]]];

let wrapParseInt = fn => val => fn(val); // 只用一个参数

function flatten(arr) {
  // return arr.toString().split(',');
  // return arr.toString().split(',').map(Number);
  return arr.toString().split(',').map(wrapParseInt(parseInt));
}

console.log(flatten([[1, 2, 3], [4, 5]]));
console.log(flatten(arr));
